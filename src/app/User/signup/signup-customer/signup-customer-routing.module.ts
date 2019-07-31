import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupCustomerComponent } from './signup-customer.component';

const routes: Routes = [
  {path:'',component:SignupCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupCustomerRoutingModule { }
