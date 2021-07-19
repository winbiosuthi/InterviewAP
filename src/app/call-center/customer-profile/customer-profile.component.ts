import { Address, PROJECTS, Project, ADDRESSES } from './../customer-table/model';
import { RepairTableService } from './../repair-table/repair-table.service';
import { ComplainTableService } from './../complain-table/complain-table.service';
import { from, Observable, of, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProfileService } from './customer-profile.service';
import { Customer } from '../customer-table/model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InformationTableService } from '../information-table/information-table.service';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customerId: number;
  customerProfile$: Observable<Customer | undefined>;
  addresses$: Observable<Address[]>;
  addressesFormated$: Observable<{ address: Address, textFormat: string }[]>;
  customerFormGroup: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
    private customerProfileService: CustomerProfileService,
    private complainTableService: ComplainTableService,
    private informationTableService: InformationTableService,
    private repairTableService: RepairTableService) {
    this.customerProfile$ = new Observable();
    this.addresses$ = new Observable();
    this.addressesFormated$ = new Observable();
    this.customerId = 0;
    this.route.paramMap.subscribe(paramMap => {
      let customerIdParam = paramMap.get('id');
      this.customerId = customerIdParam ? Number.parseInt(customerIdParam) : 0;
      this.customerProfile$ = this.customerProfileService.getCustomerById(this.customerId);
    });

    this.customerFormGroup = new FormGroup({
      title: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(),
      status: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.customerProfile$.subscribe(customerProfile => {
      if (customerProfile) {
        this.customerFormGroup.patchValue(customerProfile);
      }
    });

    this.getAddress();
  }

  onSubmit() {
    if (this.customerFormGroup.valid) {
      let submitCustomer: Customer = this.customerFormGroup.value as Customer;
      if (this.customerId) {
        submitCustomer.id = this.customerId;
      }
      this.customerProfileService.submitCustomer(submitCustomer).subscribe(result => {
        if (result) {
          alert('success!');
          if (!this.customerId) {
            this.router.navigate(['Customer', submitCustomer.id]);
          }
        }
      });
    }
  }

  createComplain() {
    this.complainTableService.openModal(null, this.customerId)
      .then(() => this.complainTableService.reload())
      .catch(() => { });
  }

  createInformation() {
    this.informationTableService.openModal(null, this.customerId)
      .then(() => this.informationTableService.reload())
      .catch(() => { });
  }

  createRepair() {
    this.repairTableService.openModal(null, this.customerId)
      .then(() => this.repairTableService.reload())
      .catch(() => { });
  }

  openAddress(address: Address | null) {
    this.customerProfileService.openAddressModal(address, this.customerId)
      .then(() => {
        this.getAddress();
      })
      .catch(() => { });
  }

  private getAddress() {
    this.addresses$ = this.customerProfileService.getAddresses(this.customerId);
    this.addressesFormated$ = this.addresses$.pipe(
      mergeMap((addresses) =>
        from(addresses).pipe(
          mergeMap(address => this.getProjectById(address.projectId).pipe(
            map(project => ({ address, textFormat: this.addressViewFormat(address, project) }))
          )),
          toArray()
        )
      )
    )
  }

  private getProjectById(id: number) {
    return of(PROJECTS).pipe(
      map(projects => {
        return projects.find(project => project.id == id);
      })
    );
  }

  private addressViewFormat(address: Address, project: Project | undefined) {
    return `${project?.projectName} ${address.addressNumber} ${address.street ? address.street : ''} ${address.subDistrict} ${address.district} ${address.province} ${address.zipCode}`;
  }

}
