import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignsComponent } from './components/designs/designs.component';

const routes: Routes = [
  {
    path: '',
    component: DesignsComponent,
    data: {
      title: 'See what we provide.',
      description: '',
      image:
        "background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('assets/images/headers/designs-page-header.jpg')",
      isHomePage: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignsRoutingModule {}
