import { Information } from './../customer-table/model';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRequest } from '../customer-table/model';
import { InformationTableService } from './information-table.service';

@Component({
  selector: 'information-table',
  templateUrl: './information-table.component.html',
  styleUrls: ['./information-table.component.css']
})
export class InformationTableComponent implements OnInit {

  @Input() customerId: number;
  informationRequest$: Observable<Information[]>;
  total$: Observable<number>;

  constructor(public informationTableService: InformationTableService) {
    this.informationRequest$ = informationTableService.customerRequest$;
    this.total$ = informationTableService.total$;
    this.customerId = 0;
  }

  ngOnInit(): void {
    this.informationTableService.customerId = this.customerId;
  }

  openModal(information: Information) {
    this.informationTableService.openModal(information, this.customerId)
      .then(() => this.informationTableService.reload())
      .catch(() => { });
  }

}
