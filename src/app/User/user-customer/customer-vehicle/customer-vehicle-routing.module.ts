import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { RoleGuardService } from '../.../../../../_guards/RoleGuardService';

const routes: Routes = [
  {path:'',component:VehicleAddComponent,canActivate:[RoleGuardService],data:{expectedRole:'Personal Customer'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerVehicleRoutingModule { }
