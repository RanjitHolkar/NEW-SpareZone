import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BackgroundImageModule } from '../background-image/background-image.module';
import { UserNavModule } from '../User/user-nav/user-nav.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    FormsModule,
    CommonModule,
    UserNavModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    BackgroundImageModule
  ]
})
export class HomeModule { }
