import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSupplierRoutingModule } from './admin-supplier-routing.module';
import { AdminSupplierComponent } from './admin-supplier.component';
import { AdminNavModule } from '../admin-nav/admin-nav.module';
import { BackgroundImageModule } from '../../background-image/background-image.module';

@NgModule({
  declarations: [AdminSupplierComponent],
  imports: [
    CommonModule,
    AdminNavModule,
    BackgroundImageModule,
    AdminSupplierRoutingModule
  ]
})
export class AdminSupplierModule { }
