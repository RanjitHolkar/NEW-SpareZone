import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessCustomerDashComponent} from './business-customer-dash.component';
import { RoleGuardService } from '../../../_guards/RoleGuardService';

const routes: Routes = [
  {path:'',component:BusinessCustomerDashComponent,canActivate:[RoleGuardService],data:{expectedRole:'Business Customer'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessCustomerDashRoutingModule { }
