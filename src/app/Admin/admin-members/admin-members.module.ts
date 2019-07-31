import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMembersRoutingModule } from './admin-members-routing.module';
import { MembersListComponent } from './members-list/members-list.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { AdminNavModule } from '../admin-nav/admin-nav.module';

@NgModule({
  declarations: [MembersListComponent, ViewAccountComponent],
  imports: [
    CommonModule,
    AdminMembersRoutingModule,
    AdminNavModule
  ]
})
export class AdminMembersModule { }
