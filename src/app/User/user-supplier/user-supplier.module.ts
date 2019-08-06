import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSupplierRoutingModule } from './user-supplier-routing.module';
import { SupplierPreferredListComponent } from './supplier-preferred-list/supplier-preferred-list.component';
import { UserNavModule } from '../user-nav/user-nav.module';
import {BackgroundImageModule} from '../../background-image/background-image.module';
@NgModule({
  declarations: [SupplierPreferredListComponent],
  imports: [
    CommonModule,
    UserNavModule,
    UserSupplierRoutingModule,
    BackgroundImageModule
  ]
})
export class UserSupplierModule { }
