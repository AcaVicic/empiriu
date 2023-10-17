import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayJournalPage } from './today-journal.page';

const routes: Routes = [
  {
    path: '',
    component: TodayJournalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayJournalPageRoutingModule {}
