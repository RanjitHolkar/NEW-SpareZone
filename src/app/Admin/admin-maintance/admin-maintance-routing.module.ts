import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MaintenanceHomeComponent} from './maintenance-home/maintenance-home.component';
import {EditVehicleComponent} from './edit-vehicle/edit-vehicle.component';
import {PartsCategoryComponent} from './parts-category/parts-category.component';
const routes: Routes = [
  {path:'',component:MaintenanceHomeComponent},
  {path:'vehicle_db',component:EditVehicleComponent},
  {path:'part_category',component:PartsCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMaintanceRoutingModule { }
