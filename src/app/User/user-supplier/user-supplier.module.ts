import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSupplierRoutingModule } from './user-supplier-routing.module';
import { SupplierPreferredListComponent } from './supplier-preferred-list/supplier-preferred-list.component';
import { UserNavModule } from '../user-nav/user-nav.module';
@NgModule({
  declarations: [SupplierPreferredListComponent],
  imports: [
    CommonModule,
    UserNavModule,
    UserSupplierRoutingModule
  ]
})
export class UserSupplierModule { }
