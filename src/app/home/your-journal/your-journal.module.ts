import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourJournalPageRoutingModule } from './your-journal-routing.module';

import { YourJournalPage } from './your-journal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourJournalPageRoutingModule
  ],
  declarations: [YourJournalPage]
})
export class YourJournalPageModule {}
