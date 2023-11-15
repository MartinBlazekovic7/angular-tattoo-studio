import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignsRoutingModule } from './designs-routing.module';
import { DesignsComponent } from './components/designs/designs.component';
import {
  NgbAccordionModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DesignsComponent],
  imports: [
    CommonModule,
    DesignsRoutingModule,
    NgbDropdownModule,
    NgbAccordionModule,
  ],
})
export class DesignsModule {}
