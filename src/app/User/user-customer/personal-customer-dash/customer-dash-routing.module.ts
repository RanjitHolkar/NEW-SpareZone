import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDashComponent } from './customer-dash.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { RoleGuardService } from '../../../_guards/RoleGuardService';

const routes: Routes = [
  {path:'',component:CustomerDashComponent ,canActivate:[RoleGuardService],data:{expectedRole:'Personal Customer'}},
  {path:'add-vehicle',component:AddVehicleComponent ,canActivate:[RoleGuardService],data:{expectedRole:'Personal Customer'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashRoutingModule { }
