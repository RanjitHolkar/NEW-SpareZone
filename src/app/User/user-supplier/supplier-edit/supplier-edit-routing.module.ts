import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierEditComponent } from './supplier-edit.component';
const routes: Routes = [
  {path:'',component:SupplierEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierEditRoutingModule { }
