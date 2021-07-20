import { Address, Project, PROJECTS, Repairing, REPAIRINGS } from './../customer-table/model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of } from 'rxjs';
import { CustomerProfileService } from '../customer-profile/customer-profile.service';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  customerId: number;
  repairFormGroup: FormGroup;
  repair: Repairing | null;
  readonly: boolean;

  projects$: Observable<Project[]>;
  addressesFormated$: Observable<{ address: Address, textFormat: string }[]>;

  constructor(private cdr: ChangeDetectorRef, private activeModal: NgbActiveModal, private customerProfileService: CustomerProfileService) {
    this.repairFormGroup = new FormGroup({
      subject: new FormControl(null, Validators.required),
      detail: new FormControl(),
      repairingType: new FormControl(null, Validators.required),
      problem: new FormControl(null, Validators.required),
      projectId: new FormControl(null, Validators.required),
      addressId: new FormControl(null, Validators.required)
    });
    this.repair = null;
    this.customerId = 0;
    this.readonly = false;
    this.projects$ = new Observable();
    this.addressesFormated$ = new Observable();
  }

  ngOnInit(): void {
    this.projects$ = this.getProjects();
    this.repairFormGroup.get('projectId')?.valueChanges.subscribe(value => {
      this.addressesFormated$ = this.getAddress(value);
    });

    if (this.repair) {
      this.readonly = true;
      this.repairFormGroup.disable();
      this.repairFormGroup.patchValue(this.repair);
    }
  }

  ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  submit() {
    if (this.repairFormGroup.valid) {
      let repair: Repairing = this.repairFormGroup.value;
      this.saveRepair(repair).subscribe(result => {
        this.activeModal.close();
      });
    }
  }

  private saveRepair(repair: Repairing) {
    return new Observable(subscribe => {
      try {
        let last = REPAIRINGS.reduce((p, c) => p.id > c.id ? p : c);
        repair.id = last.id + 1;
        repair.customerId = this.customerId,
          repair.submitDate = new Date(),
          repair.status = 'active',
          repair.createBy = 'admin';
        repair.updateBy = 'admin';
        repair.createDate = new Date();
        repair.updateDate = new Date();
        REPAIRINGS.push(repair);
        subscribe.next(true);
        subscribe.complete();
      }
      catch (error) {
        subscribe.error(error);
      }
      subscribe.unsubscribe();
    });
  }

  private getProjects() {
    return of(PROJECTS);
  }

  private getProjectById(id: number) {
    return of(PROJECTS).pipe(
      map(projects => {
        return projects.find(project => project.id == id);
      })
    );
  }

  private getAddress(projectId: number) {
    return this.customerProfileService.getAddresses(this.customerId).pipe(
      mergeMap((addresses) => {
        addresses = addresses.filter(address => address.projectId == projectId);
        return from(addresses).pipe(
          mergeMap(address => this.getProjectById(address.projectId).pipe(
            map(project => ({ address, textFormat: this.addressViewFormat(address, project) }))
          )),
          toArray()
        )
      })
    )

    // return /* getCompanyProfile: Observable<CompanyProfile> */of({ company: 1, statusId: 2 }).pipe(
    //   mergeMap(company => /* getStatusMasterById */ of({ ststusId: 2, statusName: 'active' }).pipe(
    //     map(statusObj => {
    //       return { company: company.company, statusId: statusObj.ststusId, statusName: statusObj.statusName }
    //     })
    //   ))
    // )
  }

  private addressViewFormat(address: Address, project: Project | undefined) {
    return `${project?.projectName} ${address.addressNumber} ${address.street ? address.street : ''} ${address.subDistrict} ${address.district} ${address.province} ${address.zipCode}`;
  }

}
