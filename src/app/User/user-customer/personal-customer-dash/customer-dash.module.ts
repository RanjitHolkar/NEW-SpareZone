import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashRoutingModule } from './customer-dash-routing.module';
import { CustomerDashComponent } from './customer-dash.component';
import { UserNavModule } from '../../user-nav/user-nav.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PersonalCustomerSidebarComponent } from './personal-customer-sidebar/personal-customer-sidebar.component';
import { BackgroundImageModule } from '../../../background-image/background-image.module';

@NgModule({
  declarations: [CustomerDashComponent, PersonalCustomerSidebarComponent],
  imports: [
    CommonModule,
    CustomerDashRoutingModule,
    UserNavModule,
    FormsModule,
    ReactiveFormsModule,
    BackgroundImageModule
  ]
})
export class CustomerDashModule { }
