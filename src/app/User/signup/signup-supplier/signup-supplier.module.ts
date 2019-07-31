import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupSupplierRoutingModule } from './signup-supplier-routing.module';
import { SignupSupplierComponent } from './signup-supplier.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserNavModule } from '../../user-nav/user-nav.module';
@NgModule({
  declarations: [SignupSupplierComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserNavModule,
    ReactiveFormsModule,
    SignupSupplierRoutingModule
  ]
})
export class SignupSupplierModule { }
