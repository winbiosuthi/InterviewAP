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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
