import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourJournalPage } from './your-journal.page';

const routes: Routes = [
  {
    path: '',
    component: YourJournalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourJournalPageRoutingModule {}
