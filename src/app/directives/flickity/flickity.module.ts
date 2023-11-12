import { NgModule } from '@angular/core';
import { FlickityDirective } from '@directive/flickity/flickity.directive';

@NgModule({
  declarations: [FlickityDirective],
  exports: [FlickityDirective],
})
export class FlickityModule {}
