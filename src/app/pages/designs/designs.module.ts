import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignsRoutingModule } from './designs-routing.module';
import { DesignsComponent } from './components/designs/designs.component';


@NgModule({
  declarations: [
    DesignsComponent
  ],
  imports: [
    CommonModule,
    DesignsRoutingModule
  ]
})
export class DesignsModule { }
