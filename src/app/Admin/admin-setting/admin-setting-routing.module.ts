import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSettingComponent} from './profile-setting/profile-setting.component';
import {GeneralSettingComponent} from './general-setting/general-setting.component'
import {SupplierSettingComponent} from './supplier-setting/supplier-setting.component'
import { NavSettingComponent } from './nav-setting/nav-setting.component';
const routes: Routes = [

  {path:'',component:NavSettingComponent},
  {path:'profile-setting' , component:ProfileSettingComponent},
  {path:'general-setting' , component:GeneralSettingComponent},
  {path:'supplier-setting', component:SupplierSettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingRoutingModule { }
