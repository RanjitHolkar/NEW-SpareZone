import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessCustomerDashRoutingModule } from './business-customer-dash-routing.module';
import { BusinessCustomerDashComponent } from './business-customer-dash.component';
import { UserNavModule } from '../../user-nav/user-nav.module';
@NgModule({
  declarations: [BusinessCustomerDashComponent],
  imports: [
    CommonModule,
    UserNavModule,
    BusinessCustomerDashRoutingModule
  ]
})
export class BusinessCustomerDashModule { }
