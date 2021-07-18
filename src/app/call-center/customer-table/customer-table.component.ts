import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from './model';
import { CustomerTableService } from './customer-table.service';

@Component({
  selector: 'customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  @Input() searchTermFormControl: FormControl;

  customer$: Observable<Customer[]>;
  total$: Observable<number>;

  constructor(public customerTableService: CustomerTableService) {
    this.customer$ = customerTableService.customer$;
    this.total$ = customerTableService.total$;
    this.searchTermFormControl = new FormControl(null);
  }
  ngOnInit(): void {
    this.searchTermFormControl.valueChanges.subscribe(value => {
      this.customerTableService.searchTerm = value;
    });
  }
}
