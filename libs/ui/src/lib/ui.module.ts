import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import {ButtonModule} from 'primeng/button';
import { GalleyComponent } from './components/galley/galley.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    GalleyComponent
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    GalleyComponent
  ],
})
export class UiModule {}
