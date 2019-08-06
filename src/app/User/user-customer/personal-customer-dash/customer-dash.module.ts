import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashRoutingModule } from './customer-dash-routing.module';
import { CustomerDashComponent } from './customer-dash.component';
import { UserNavModule } from '../../user-nav/user-nav.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PersonalCustomerSidebarComponent } from './personal-customer-sidebar/personal-customer-sidebar.component';


@NgModule({
  declarations: [CustomerDashComponent, PersonalCustomerSidebarComponent],
  imports: [
    CommonModule,
    CustomerDashRoutingModule,
    UserNavModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerDashModule { }
