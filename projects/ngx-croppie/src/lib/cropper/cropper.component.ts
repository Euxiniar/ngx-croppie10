import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  OnInit,
  OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';

import * as Cropper from 'croppie';
import CropData from 'croppie';
import {ResizedEvent} from 'angular-resize-event';

export interface ImageCropperSetting {
  width?: number;
  height?: number;
  width_percent?: number;
  height_percent?: number;
  ratio?: number;
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
export class CropperComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('image') image: ElementRef;
  cropperWrapper: HTMLElement;
  cropperClass: HTMLElement;

  @Input() imageUrl: any;
  @Input() settings: ImageCropperSetting;
  @Input() loadImageErrorText: string;
  @Input() cropperOptions: CropperOptions;

  public isLoading = true;
  public cropper: Cropper;
  public imageElement: HTMLImageElement;
  public loadError: any;
  public initialized = false;
  public ratio = false;

  constructor() {
  }

  ngOnInit(): void {
    this.initialized = true;
    this.cropperWrapper = document.getElementById('cropper-wrapper');
    this.cropperClass = document.getElementById('cropperClass');
    this.updateCropperStyle(this.settings);
  }

  ngOnDestroy(): void {
    if (this.cropper) {
      this.cropper = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) {
      this.updateCropperStyle(changes.settings.currentValue);
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

    this.imageElement = null;
    this.imageElement = ev.target as HTMLImageElement;
    this.updateCropper();
  }

  updateCropper(): void {
    if (this.cropperOptions.viewport) {
      if (this.cropperOptions.viewport.width_percent) {
        this.cropperOptions.viewport.width = this.settings.width * (this.cropperOptions.viewport.width_percent / 100);
      }
      if (this.cropperOptions.viewport.height_percent) {
        this.cropperOptions.viewport.height = (this.settings.height - 59) * (this.cropperOptions.viewport.height_percent / 100);
      }
    }
    this.cropper = new Cropper(this.imageElement, this.cropperOptions);

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

  onResized($event: ResizedEvent): void {
    this.settings.width = $event.element.nativeElement.offsetWidth;
    this.settings.height = $event.element.nativeElement.offsetHeight;
    if (!this.isLoading) {
      if (this.cropper) {
        this.cropper = null;
        const cropperElem = this.cropperClass;
        const parent = this.image.nativeElement.parentElement;

        cropperElem.appendChild(this.image.nativeElement);
        cropperElem.removeChild(parent);
        this.updateCropper();
      }
    }
  }

  private updateCropperStyle(currentValue: ImageCropperSetting): void {
    if (currentValue.ratio) {
      // style cropper-wrapper et cropper en mode ratio
      this.ratio = true;
      this.cropperWrapper.style.paddingTop = currentValue.ratio * 100 + '%';
    } else {
      this.cropperWrapper.style.paddingTop = '';
      this.ratio = false;
      // style cropper-wrapper et cropper en mode classic
      if (currentValue.width_percent) {
        this.cropperClass.style.width = currentValue.width_percent.toString() + '%';
      } else if (currentValue.width) {
        this.cropperClass.style.width = currentValue.width.toString() + 'px';
      }
      if (currentValue.height_percent) {
        this.cropperClass.style.height = currentValue.height_percent.toString() + '%';
      } else if (currentValue.height) {
        this.cropperClass.style.height = currentValue.height.toString() + 'px';
      }
    }
  }
}
