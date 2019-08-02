import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundImageComponent } from './background-image.component';

@NgModule({
  declarations: [BackgroundImageComponent],
  imports: [
    CommonModule
  ],
  exports:[BackgroundImageComponent]
})
export class BackgroundImageModule { }
