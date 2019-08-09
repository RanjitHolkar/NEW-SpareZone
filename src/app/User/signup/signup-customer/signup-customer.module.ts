import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupCustomerRoutingModule } from './signup-customer-routing.module';
import { SignupCustomerComponent } from './signup-customer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserNavModule } from '../../user-nav/user-nav.module';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    SignupCustomerComponent
  ],
  imports: [
    CommonModule,
    SignupCustomerRoutingModule,
    FormsModule,
    UserNavModule,
    ReactiveFormsModule,
    ImageCropperModule
  ]
})
export class SignupCustomerModule { }
