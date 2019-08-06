import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { RoleGuardService } from '../../_guards/RoleGuardService';

const routes: Routes = [

  {path:'',component:ActivityComponent,canActivate:[RoleGuardService],data:{expectedRole:'Admin'}}
];
// canActivate:[RoleGuard],  data: {    expectedRole: '1'  }
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminActivityRoutingModule { }
