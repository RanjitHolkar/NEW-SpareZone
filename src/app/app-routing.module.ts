import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path:'',loadChildren: './home/home.module#HomeModule',pathMatch:'full' 
  },
  {
    path:'login',loadChildren: './login/login.module#LoginModule',
  },
  {
    path:'admin-activity',loadChildren: './Admin/admin-activity/admin-activity.module#AdminActivityModule' 
  },
  {
    path:'admin-setting',loadChildren: './Admin/admin-setting/admin-setting.module#AdminSettingModule' 
  },
  {
    path: 'signup-customer',loadChildren: './User/signup/signup-customer/signup-customer.module#SignupCustomerModule'
  },
  {
    path: 'signup-supplier',loadChildren: './User/signup/signup-supplier/signup-supplier.module#SignupSupplierModule'
  },
  {
    path:'supplier-preferred-list',loadChildren:'./User/user-supplier/user-supplier.module#UserSupplierModule'
  },
  {
    path:'add-vehicle',loadChildren:'./User/user-customer/customer-vehicle/customer-vehicle.module#CustomerVehicleModule'
  },
  {
    path:'admin-maintenance',loadChildren:'./Admin/admin-maintance/admin-maintance.module#AdminMaintanceModule'
  },
  {
    path:'supplier-dash',loadChildren:'./User/user-supplier/supplier-dash/supplier-dash.module#SupplierDashModule'
  },
  {
    path:'supplier-edit',loadChildren:'./User/user-supplier/supplier-edit/supplier-edit.module#SupplierEditModule'
  },
  {
    path:'member-listing',loadChildren:'./Admin/admin-members/admin-members.module#AdminMembersModule'
  },
  {
    path:'customer-edit',loadChildren:'./User/user-customer/customer-edit/customer-edit.module#CustomerEditModule'
  },
  {
    path:'personal-customer-dash',loadChildren:'./User/user-customer/personal-customer-dash/customer-dash.module#CustomerDashModule'
  },
  {
    path:'business-customer-dash',loadChildren:'./User/user-customer/business-customer-dash/business-customer-dash.module#BusinessCustomerDashModule'
  },
  {
    path:'supplier-listing',loadChildren:'./Admin/admin-supplier/admin-supplier.module#AdminSupplierModule'
  },
  {
    path:'**',loadChildren: './home/home.module#HomeModule',pathMatch:'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
