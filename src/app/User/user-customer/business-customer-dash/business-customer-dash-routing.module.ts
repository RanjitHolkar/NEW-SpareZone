import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessCustomerDashComponent} from './business-customer-dash.component';

const routes: Routes = [
  {path:'',component:BusinessCustomerDashComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessCustomerDashRoutingModule { }
