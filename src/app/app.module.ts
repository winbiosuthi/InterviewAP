import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { DataDictComponent } from './data-dict/data-dict.component';
import { CallCenterComponent } from './call-center/call-center.component';
import { CustomerTableComponent } from './call-center/customer-table/customer-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerProfileComponent } from './call-center/customer-profile/customer-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { InformationTableComponent } from './call-center/information-table/information-table.component';
import { ComplainTableComponent } from './call-center/complain-table/complain-table.component';
import { RepairTableComponent } from './call-center/repair-table/repair-table.component';
import { ComplainComponent } from './call-center/complain/complain.component';
import { InformationComponent } from './call-center/information/information.component';
import { RepairComponent } from './call-center/repair/repair.component';
import { AddressComponent } from './call-center/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataDictComponent,
    CallCenterComponent,
    CustomerTableComponent,
    CustomerProfileComponent,
    InformationTableComponent,
    ComplainTableComponent,
    RepairTableComponent,
    ComplainComponent,
    InformationComponent,
    RepairComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
