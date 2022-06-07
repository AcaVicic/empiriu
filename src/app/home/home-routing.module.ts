import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'daily-quote',
    loadChildren: () => import('./daily-quote/daily-quote.module').then( m => m.DailyQuotePageModule)
  },
  {
    path: 'your-journal',
    loadChildren: () => import('./your-journal/your-journal.module').then( m => m.YourJournalPageModule)
  },
  {
    path: 'memento-mori',
    loadChildren: () => import('./memento-mori/memento-mori.module').then( m => m.MementoMoriPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
