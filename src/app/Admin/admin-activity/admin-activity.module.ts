import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminActivityRoutingModule } from './admin-activity-routing.module';
import { ActivityComponent } from './activity/activity.component';
import { AdminNavModule} from '../admin-nav/admin-nav.module';
@NgModule({
  declarations: [ActivityComponent],
  imports: [
    CommonModule,
    AdminActivityRoutingModule,
    AdminNavModule
  ]
})
export class AdminActivityModule { }
