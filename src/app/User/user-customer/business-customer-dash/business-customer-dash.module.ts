import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessCustomerDashRoutingModule } from './business-customer-dash-routing.module';
import { BusinessCustomerDashComponent } from './business-customer-dash.component';

@NgModule({
  declarations: [BusinessCustomerDashComponent],
  imports: [
    CommonModule,
    BusinessCustomerDashRoutingModule
  ]
})
export class BusinessCustomerDashModule { }
