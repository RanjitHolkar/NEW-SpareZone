import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierEditComponent } from './supplier-edit.component';
import { RoleGuardService } from '../.../../../../_guards/RoleGuardService';
const routes: Routes = [
  {path:'',component:SupplierEditComponent,canActivate:[RoleGuardService],data:{expectedRole:'Supplier'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierEditRoutingModule { }
