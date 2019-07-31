import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierDashRoutingModule } from './supplier-dash-routing.module';
import { SupplierDashComponent } from './supplier-dash.component';
import { UserNavModule } from '../../user-nav/user-nav.module';

@NgModule({
  declarations: [SupplierDashComponent],
  imports: [
    CommonModule,
    UserNavModule,
    SupplierDashRoutingModule
  ]
})
export class SupplierDashModule { }
