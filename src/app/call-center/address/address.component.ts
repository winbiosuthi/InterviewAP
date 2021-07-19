import { CustomerProfileService } from './../customer-profile/customer-profile.service';
import { Address, ADDRESSES, Project, PROJECTS } from './../customer-table/model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  customerId: number;
  addressFormGroup: FormGroup;
  address: Address | null;
  projects$: Observable<Project[]>;

  constructor(private cdr: ChangeDetectorRef, private activeModal: NgbActiveModal) {
    this.addressFormGroup = new FormGroup({
      addressNumber: new FormControl(null, Validators.required),
      street: new FormControl(),
      subDistrict: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      projectId: new FormControl(),
      status: new FormControl(null, Validators.required)
    });
    this.address = null;
    this.customerId = 0;
    this.projects$ = new Observable();
  }

  ngOnInit(): void {
    this.projects$ = this.getProjects();
    if (this.address) {
      this.addressFormGroup.patchValue(this.address);
    }
  }

  ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  submit() {
    if (this.addressFormGroup.valid) {
      let address: Address = this.addressFormGroup.value;
      this.saveAddress(address).subscribe(result => {
        this.activeModal.close();
      });
    }
  }

  private saveAddress(submitAddress: Address) {
    return new Observable(subscribe => {
      try {
        let address = ADDRESSES.find(address => address.id == this.address?.id);
        if (address) {
          address.addressNumber = submitAddress.addressNumber;
          address.street = submitAddress.street;
          address.subDistrict = submitAddress.subDistrict;
          address.district = submitAddress.district;
          address.province = submitAddress.province;
          address.zipCode = submitAddress.zipCode;
          address.projectId = submitAddress.projectId;
          address.status = submitAddress.status;
          address.updateBy = 'admin';
          address.updateDate = new Date();
          subscribe.next(true);
          subscribe.complete();
          return;
        }
        let last = ADDRESSES.reduce((p, c) => p.id > c.id ? p : c);
        submitAddress.id = last.id + 1;
        submitAddress.customerId = this.customerId;
        submitAddress.createBy = 'admin';
        submitAddress.updateBy = 'admin';
        submitAddress.createDate = new Date();
        submitAddress.updateDate = new Date();
        ADDRESSES.push(submitAddress);
        subscribe.next(true);
        subscribe.complete();
      }
      catch(error) {
        subscribe.error(error);
      }
      subscribe.unsubscribe();
    });
  }

  private getProjects() {
    return of(PROJECTS);
  }

}
