import { NgModule } from '@angular/core';
import { CropperComponent } from './cropper/cropper.component';
import {CommonModule} from '@angular/common';
import {AngularResizedEventModule} from 'angular-resize-event';

@NgModule({
  declarations: [CropperComponent],
  imports: [
    CommonModule,
    AngularResizedEventModule
  ],
  exports: [CropperComponent]
})
export class NgxCroppieModule { }
