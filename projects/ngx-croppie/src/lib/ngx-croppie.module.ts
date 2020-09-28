import { NgModule } from '@angular/core';
import { CropperComponent } from './cropper/cropper.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [CropperComponent],
  imports: [
    CommonModule
  ],
  exports: [CropperComponent]
})
export class NgxCroppieModule { }
