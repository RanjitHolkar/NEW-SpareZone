import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierPreferredListComponent } from './supplier-preferred-list/supplier-preferred-list.component';
const routes: Routes = [
  {path:'',component:SupplierPreferredListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSupplierRoutingModule { }
