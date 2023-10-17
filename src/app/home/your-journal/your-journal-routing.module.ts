import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourJournalPage } from './your-journal.page';

const routes: Routes = [
  {
    path: '',
    component: YourJournalPage
  },
  {
    path: 'today-journal',
    loadChildren: () => import('./today-journal/today-journal.module').then( m => m.TodayJournalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourJournalPageRoutingModule {}
