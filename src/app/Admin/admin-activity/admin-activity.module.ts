import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminActivityRoutingModule } from './admin-activity-routing.module';
import { ActivityComponent } from './activity/activity.component';
import { AdminNavModule} from '../admin-nav/admin-nav.module';
import { BackgroundImageModule } from '../../background-image/background-image.module';
@NgModule({
  declarations: [ActivityComponent],
  imports: [
    CommonModule,
    AdminNavModule,
    BackgroundImageModule,
    AdminActivityRoutingModule
  ]
})
export class AdminActivityModule { }
