import { Customer } from '../customer-table/model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CUSTOMERS } from '../customer-table/model';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {

  constructor() { }

  getCustomerById(id: number) {
    return of(CUSTOMERS).pipe(
      map(customers => {
        return customers.find(customer => customer.id == id);
      })
    );
  }

  submitCustomer(submitCustomer: Customer) {
    return new Observable(subscribe => {
      try {
        let customer = CUSTOMERS.find(customer => submitCustomer.id == customer.id);
        if (customer) {
          customer.title = submitCustomer.title;
          customer.firstName = submitCustomer.firstName;
          customer.lastName = submitCustomer.lastName;
          customer.phoneNumber = submitCustomer.phoneNumber;
          customer.email = submitCustomer.email;
          customer.status = submitCustomer.status;
          customer.updateBy = 'admin';
          customer.updateDate = new Date();
          subscribe.next(true);
          subscribe.complete();
          return;
        }
        let last = CUSTOMERS.reduce((p, c) => p.id > c.id ? p : c);
        submitCustomer.id = last.id + 1;
        submitCustomer.createBy = 'admin';
        submitCustomer.updateBy = 'admin';
        submitCustomer.createDate = new Date();
        submitCustomer.updateDate = new Date();
        CUSTOMERS.push(submitCustomer);
        subscribe.next(true);
        subscribe.complete();
      }
      catch(error) {
        subscribe.error(error);
      }
      subscribe.unsubscribe();
    });
  }
}
