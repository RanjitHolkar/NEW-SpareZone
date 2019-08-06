import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSettingComponent} from './profile-setting/profile-setting.component';
import {GeneralSettingComponent} from './general-setting/general-setting.component'
import {SupplierSettingComponent} from './supplier-setting/supplier-setting.component'
import { NavSettingComponent } from './nav-setting/nav-setting.component';
import { RoleGuardService } from '../.../../../_guards/RoleGuardService';
const routes: Routes = [

  {path:'',component:NavSettingComponent,canActivate:[RoleGuardService],data:{expectedRole:'Admin'}},
  {path:'profile-setting' , component:ProfileSettingComponent,canActivate:[RoleGuardService],data:{expectedRole:'Admin'}},
  {path:'general-setting' , component:GeneralSettingComponent,canActivate:[RoleGuardService],data:{expectedRole:'Admin'}},
  {path:'supplier-setting', component:SupplierSettingComponent,canActivate:[RoleGuardService],data:{expectedRole:'Admin'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingRoutingModule { }
