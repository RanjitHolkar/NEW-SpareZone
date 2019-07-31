import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNavRoutingModule } from './user-nav-routing.module';
import { UserNavComponent } from './user-nav.component';

@NgModule({
  declarations: [UserNavComponent],
  imports: [
    CommonModule,
    UserNavRoutingModule
  ],
  exports:[UserNavComponent]
})
export class UserNavModule { }
