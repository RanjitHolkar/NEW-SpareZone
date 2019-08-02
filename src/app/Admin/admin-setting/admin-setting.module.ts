import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSettingRoutingModule } from './admin-setting-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { SupplierSettingComponent } from './supplier-setting/supplier-setting.component';
import { CmsSettingComponent } from './cms-setting/cms-setting.component';
import { NavSettingComponent } from './nav-setting/nav-setting.component';
import { NotificationComponent } from '../notification/notification.component';
import { AdminNavModule } from '../admin-nav/admin-nav.module';
import { BackgroundImageModule } from '../../background-image/background-image.module';
@NgModule({
  declarations: [
    CmsSettingComponent, 
    NavSettingComponent,
    NotificationComponent,
    ProfileSettingComponent,
    GeneralSettingComponent,
    SupplierSettingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminNavModule,
    ReactiveFormsModule,
    BackgroundImageModule,
    AdminSettingRoutingModule
  ]
})
export class AdminSettingModule { }
