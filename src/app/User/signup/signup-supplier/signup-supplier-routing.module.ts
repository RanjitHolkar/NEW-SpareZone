import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupSupplierComponent } from './signup-supplier.component';

const routes: Routes = [
  {
    path:'',component:SignupSupplierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupSupplierRoutingModule { }
