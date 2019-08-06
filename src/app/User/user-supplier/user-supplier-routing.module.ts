import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierPreferredListComponent } from './supplier-preferred-list/supplier-preferred-list.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
const routes: Routes = [
  {path:'',component:SupplierPreferredListComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSupplierRoutingModule { }
