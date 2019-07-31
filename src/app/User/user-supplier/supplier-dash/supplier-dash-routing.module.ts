import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierDashComponent } from './supplier-dash.component';

const routes: Routes = [
  {path:'',component:SupplierDashComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierDashRoutingModule { }
