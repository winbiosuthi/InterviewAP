import { Complain } from './../customer-table/model';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplainTableService } from './complain-table.service';

@Component({
  selector: 'complain-table',
  templateUrl: './complain-table.component.html',
  styleUrls: ['./complain-table.component.css']
})
export class ComplainTableComponent implements OnInit {

  @Input() customerId: number;
  complainRequest$: Observable<Complain[]>;
  total$: Observable<number>;

  constructor(public complainTableService: ComplainTableService) {
    this.complainRequest$ = complainTableService.complaintRequest$;
    this.total$ = complainTableService.total$;
    this.customerId = 0;
  }

  ngOnInit(): void {
    this.complainTableService.customerId = this.customerId;
  }

  openModal(complain: Complain) {
    this.complainTableService.openModal(complain, this.customerId)
      .then(() => this.complainTableService.reload())
      .catch(() => { });
  }

}
