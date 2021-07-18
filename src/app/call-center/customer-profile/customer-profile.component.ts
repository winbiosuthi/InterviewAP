import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProfileService } from './customer-profile.service';
import { Customer } from '../customer-table/model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customerId: number;
  customerProfile$: Observable<Customer | undefined>;
  customerFormGroup: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private customerProfileService: CustomerProfileService) {
    this.customerProfile$ = new Observable();
    this.customerId = 0;
    this.route.paramMap.subscribe(paramMap => {
      let customerIdParam = paramMap.get('id');
      this.customerId = customerIdParam ? Number.parseInt(customerIdParam) : 0;
      this.customerProfile$ = this.customerProfileService.getCustomerById(this.customerId);
    });

    this.customerFormGroup = new FormGroup({
      title: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(),
      status: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.customerProfile$.subscribe(customerProfile => {
      if (customerProfile) {
        this.customerFormGroup.patchValue(customerProfile);
      }
    });
  }

  onSubmit() {
    if (this.customerFormGroup.valid) {
      let submitCustomer: Customer = this.customerFormGroup.value as Customer;
      if (this.customerId) {
        submitCustomer.id = this.customerId;
      }
      this.customerProfileService.submitCustomer(submitCustomer).subscribe(result => {
        if (result) {
          alert('success!');
          if (!this.customerId) {
            this.router.navigate(['Customer', submitCustomer.id]);
          }
        }
      });
    }
  }

}
