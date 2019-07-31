import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { RoleGuardService as RoleGuard } from '../../_guards/RoleGuardService';
import { AuthGuard } from '../../_guards/auth.guard';
import {AdminProfileComponent} from '../admin-profile/admin-profile.component'

const routes: Routes = [

  {
    path:'',component:ActivityComponent
  }
];
// canActivate:[RoleGuard],  data: {    expectedRole: '1'  }
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminActivityRoutingModule { }
