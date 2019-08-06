import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierDashComponent } from './supplier-dash.component';
import { RoleGuardService } from '../.../../../../_guards/RoleGuardService';

const routes: Routes = [
  {path:'',component:SupplierDashComponent,canActivate:[RoleGuardService],data:{expectedRole:'Supplier'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierDashRoutingModule { }
