import { AddressComponent } from './../address/address.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address, PROJECTS } from './../customer-table/model';
import { ADDRESSES, Customer } from '../customer-table/model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CUSTOMERS } from '../customer-table/model';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {

  constructor(private ngbModal: NgbModal) { }

  getCustomerById(id: number) {
    return of(CUSTOMERS).pipe(
      map(customers => {
        return customers.find(customer => customer.id == id);
      })
    );
  }

  getAddresses(id: number) {
    return of(ADDRESSES).pipe(
      map(addresses => {
        return addresses.filter(address => address.customerId == id);
      })
    )
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

  openAddressModal(address: Address | null = null, customerId: number) {
    const modalRef = this.ngbModal.open(AddressComponent, {
      backdrop: true,
      size: 'lg'
    });

    modalRef.componentInstance.address = address;
    modalRef.componentInstance.customerId = customerId;
    return modalRef.result;
  }
}
