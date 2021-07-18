import { CustomerProfileComponent } from './call-center/customer-profile/customer-profile.component';
import { CallCenterComponent } from './call-center/call-center.component';
import { DataDictComponent } from './data-dict/data-dict.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'DataDict',
    component: DataDictComponent
  },
  {
    path: 'CallCenter',
    component: CallCenterComponent
  },
  {
    path: 'CreateCustomer',
    component: CustomerProfileComponent
  },
  {
    path: 'Customer/:id',
    component: CustomerProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
