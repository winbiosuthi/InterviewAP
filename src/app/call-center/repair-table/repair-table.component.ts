import { Repairing } from './../customer-table/model';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplainTableService } from '../complain-table/complain-table.service';
import { RepairTableService } from './repair-table.service';

@Component({
  selector: 'repair-table',
  templateUrl: './repair-table.component.html',
  styleUrls: ['./repair-table.component.css']
})
export class RepairTableComponent implements OnInit {

  @Input() customerId: number;
  repairRequest$: Observable<Repairing[]>;
  total$: Observable<number>;

  constructor(public repairTableService: RepairTableService) {
    this.repairRequest$ = repairTableService.repairRequest$;
    this.total$ = repairTableService.total$;
    this.customerId = 0;
  }

  ngOnInit(): void {
    this.repairTableService.customerId = this.customerId;
  }

  openModal(repair: Repairing) {
    this.repairTableService.openModal(repair, this.customerId)
      .then(() => this.repairTableService.reload())
      .catch(() => { });
  }

}
