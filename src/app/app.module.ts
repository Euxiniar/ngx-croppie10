import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxCroppieModule } from '../../projects/ngx-croppie/src/lib/ngx-croppie.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCroppieModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
