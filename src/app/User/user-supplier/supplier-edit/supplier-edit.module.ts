import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierEditRoutingModule } from './supplier-edit-routing.module';
import { SupplierEditComponent } from './supplier-edit.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserNavModule } from '../../user-nav/user-nav.module';

@NgModule({
  declarations: [SupplierEditComponent],
  imports: [
    CommonModule,
    SupplierEditRoutingModule,
    FormsModule,
    UserNavModule,
    ReactiveFormsModule
  ]
})
export class SupplierEditModule { }
