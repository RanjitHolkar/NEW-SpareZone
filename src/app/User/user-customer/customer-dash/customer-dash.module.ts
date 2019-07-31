import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashRoutingModule } from './customer-dash-routing.module';
import { CustomerDashComponent } from './customer-dash.component';
import { UserNavModule } from '../../user-nav/user-nav.module';

@NgModule({
  declarations: [CustomerDashComponent],
  imports: [
    CommonModule,
    CustomerDashRoutingModule,
    UserNavModule
  ]
})
export class CustomerDashModule { }
