import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavComponent } from './admin-nav.component';
import { AdminNavRoutingModule } from './admin-nav-routing.module';
import { AdminProfileComponent} from '../admin-profile/admin-profile.component';

@NgModule({
  declarations: [AdminProfileComponent,AdminNavComponent],
  imports: [
    CommonModule,
    AdminNavRoutingModule 
  ],
  exports:[AdminNavComponent,AdminProfileComponent]
})
export class AdminNavModule {}
