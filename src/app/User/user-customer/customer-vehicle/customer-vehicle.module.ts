import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerVehicleRoutingModule } from './customer-vehicle-routing.module';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';

@NgModule({
  declarations: [VehicleAddComponent],
  imports: [
    CommonModule,
    CustomerVehicleRoutingModule
  ]
})
export class CustomerVehicleModule { }
