import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyQuotePage } from './daily-quote.page';

const routes: Routes = [
  {
    path: '',
    component: DailyQuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyQuotePageRoutingModule {}
