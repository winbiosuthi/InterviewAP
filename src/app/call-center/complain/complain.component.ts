import { COMPLAINS, Complain } from './../customer-table/model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {

  customerId: number;
  complainFormGroup: FormGroup;
  complain: Complain | null;
  readonly: boolean;

  constructor(private cdr: ChangeDetectorRef, private activeModal: NgbActiveModal) {
    this.complainFormGroup = new FormGroup({
      subject: new FormControl(null, Validators.required),
      detail: new FormControl(),
      complainType: new FormControl(null, Validators.required)
    });
    this.complain = null;
    this.customerId = 0;
    this.readonly = false;
  }

  ngOnInit(): void {
    if (this.complain) {
      this.readonly = true;
      this.complainFormGroup.patchValue(this.complain);
    }
  }

  ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  submit() {
    if (this.complainFormGroup.valid) {
      let complain: Complain = this.complainFormGroup.value;
      this.saveComplain(complain).subscribe(result => {
        this.activeModal.close();
      });
    }
  }

  private saveComplain(complain: Complain) {
    return new Observable(subscribe => {
      try {
        let last = COMPLAINS.reduce((p, c) => p.id > c.id ? p : c);
        complain.id = last.id + 1;
        complain.customerId = this.customerId,
        complain.submitDate = new Date(),
        complain.status = 'active',
        complain.createBy = 'admin';
        complain.updateBy = 'admin';
        complain.createDate = new Date();
        complain.updateDate = new Date();
        COMPLAINS.push(complain);
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
