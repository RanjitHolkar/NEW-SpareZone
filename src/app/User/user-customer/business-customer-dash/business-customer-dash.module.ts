import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessCustomerDashRoutingModule } from './business-customer-dash-routing.module';
import { BusinessCustomerDashComponent } from './business-customer-dash.component';
import { UserNavModule } from '../../user-nav/user-nav.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";



@NgModule({
  declarations: [BusinessCustomerDashComponent],
  imports: [
    CommonModule,
    UserNavModule,
    FormsModule,
    ReactiveFormsModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    BusinessCustomerDashRoutingModule
  ],
})
export class BusinessCustomerDashModule { }

