import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerEditRoutingModule } from './customer-edit-routing.module';
import { CustomerEditComponent } from './customer-edit.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserNavModule } from '../../user-nav/user-nav.module';

@NgModule({
  declarations: [CustomerEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserNavModule,    
    ReactiveFormsModule,
    CustomerEditRoutingModule
  ]
})
export class CustomerEditModule { }
