import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersListComponent } from '../admin-members/members-list/members-list.component';
import { RoleGuardService } from '../.../../../_guards/RoleGuardService';
const routes: Routes = [
  {path:'',component:MembersListComponent,canActivate:[RoleGuardService],data:{expectedRole:'Admin'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMembersRoutingModule { }
