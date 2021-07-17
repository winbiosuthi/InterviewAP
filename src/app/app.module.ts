import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { DataDictComponent } from './data-dict/data-dict.component';
import { CallCenterComponent } from './call-center/call-center.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataDictComponent,
    CallCenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
