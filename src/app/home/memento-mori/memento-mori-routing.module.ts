import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MementoMoriPage } from './memento-mori.page';

const routes: Routes = [
  {
    path: '',
    component: MementoMoriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MementoMoriPageRoutingModule {}
