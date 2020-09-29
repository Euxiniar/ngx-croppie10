import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  OnInit,
  OnDestroy
} from '@angular/core';

import Cropper from 'croppie';
import CropData from 'croppie';

export interface ImageCropperSetting {
  width?: number;
  height?: number;
  width_percent?: number;
  height_percent?: number;
}

export interface CropperOptions {
  boundary?: any;
  customClass?: string;
  enableExif?: boolean;
  enableOrientation?: boolean;
  enableResize?: boolean;
  enableZoom?: boolean;
  enforceBoundary?: boolean;
  mouseWheelZoom?: boolean;
  showZoomer?: boolean;
  viewport?: {
    width?: number;
    height?: number;
    width_percent?: number;
    height_percent?: number;
    type: string;
  };
}

@Component({
  selector: 'ngx-croppie',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CropperComponent implements OnInit, OnDestroy {
  @ViewChild('image') image: ElementRef;

  @Input() imageUrl: any;
  @Input() settings: ImageCropperSetting;
  @Input() loadImageErrorText: string;
  @Input() cropperOptions: CropperOptions;

  public isLoading = true;
  public cropper: Cropper;
  public imageElement: HTMLImageElement;
  public loadError: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
  }

  /**
   * Image loaded
   * @param ev is the event emitted
   */
  imageLoaded(ev: Event): void {
    //
    // Unset load error state
    this.isLoading = false;
    this.loadError = false;

    const image = ev.target as HTMLImageElement;
    this.imageElement = image;

    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }

    if (this.cropperOptions.viewport) {
      if (this.cropperOptions.viewport.width_percent) {
        this.cropperOptions.viewport.width = this.settings.width * (this.cropperOptions.viewport.width_percent / 100);
      }
      if (this.cropperOptions.viewport.height_percent) {
        this.cropperOptions.viewport.height = this.settings.height * (this.cropperOptions.viewport.height_percent / 100);
      }
    }
    this.cropper = new Cropper(image, this.cropperOptions);
  }

  /**
   * Image load error
   * @param event is the error event
   */
  imageLoadError(event: any): void {

    //
    // Set load error state
    this.loadError = true;

    //
    // Unset loading state
    this.isLoading = false;
  }

  get(): CropData {
    return this.cropper.get();
  }

  getResult(): Promise<any> {
    return this.cropper.result();
  }
}
