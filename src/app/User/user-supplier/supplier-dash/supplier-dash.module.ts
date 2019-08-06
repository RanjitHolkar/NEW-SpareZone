import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierDashRoutingModule } from './supplier-dash-routing.module';
import { SupplierDashComponent } from './supplier-dash.component';
import { UserNavModule } from '../../user-nav/user-nav.module';
import {BackgroundImageModule} from '../../../background-image/background-image.module';
@NgModule({
  declarations: [SupplierDashComponent],
  imports: [
    CommonModule,
    UserNavModule,
    SupplierDashRoutingModule,
    BackgroundImageModule
  ]
})
export class SupplierDashModule { }
