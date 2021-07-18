import { Information, INFORNATIONS } from './../customer-table/model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  customerId: number;
  informationFormGroup: FormGroup;
  information: Information | null;
  readonly: boolean;

  constructor(private cdr: ChangeDetectorRef, private activeModal: NgbActiveModal) {
    this.informationFormGroup = new FormGroup({
      subject: new FormControl(null, Validators.required),
      detail: new FormControl(),
      informationType: new FormControl(null, Validators.required)
    });
    this.information = null;
    this.customerId = 0;
    this.readonly = false;
  }

  ngOnInit(): void {
    if (this.information) {
      this.readonly = true;
      this.informationFormGroup.patchValue(this.information);
    }
  }

  ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  submit() {
    if (this.informationFormGroup.valid) {
      let information: Information = this.informationFormGroup.value;
      this.saveInformation(information).subscribe(result => {
        this.activeModal.close();
      });
    }
  }

  private saveInformation(information: Information) {
    return new Observable(subscribe => {
      try {
        let last = INFORNATIONS.reduce((p, c) => p.id > c.id ? p : c);
        information.id = last.id + 1;
        information.customerId = this.customerId,
        information.submitDate = new Date(),
        information.status = 'active',
        information.createBy = 'admin';
        information.updateBy = 'admin';
        information.createDate = new Date();
        information.updateDate = new Date();
        INFORNATIONS.push(information);
        subscribe.next(true);
        subscribe.complete();
      }
      catch (error) {
        subscribe.error(error);
      }
      subscribe.unsubscribe();
    });
  }

}
