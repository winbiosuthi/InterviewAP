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
import { CustomerRequestComponent } from './call-center/customer-request/customer-request.component';
import { CustomerProfileComponent } from './call-center/customer-profile/customer-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { InformationTableComponent } from './call-center/information-table/information-table.component';
import { ComplainTableComponent } from './call-center/complain-table/complain-table.component';
import { RepairTableComponent } from './call-center/repair-table/repair-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataDictComponent,
    CallCenterComponent,
    CustomerTableComponent,
    CustomerRequestComponent,
    CustomerProfileComponent,
    InformationTableComponent,
    ComplainTableComponent,
    RepairTableComponent
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
