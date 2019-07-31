import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserNavModule } from '../User/user-nav/user-nav.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    UserNavModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
