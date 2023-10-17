import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayJournalPageRoutingModule } from './today-journal-routing.module';

import { TodayJournalPage } from './today-journal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayJournalPageRoutingModule
  ],
  declarations: [TodayJournalPage]
})
export class TodayJournalPageModule {}
