import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyQuotePageRoutingModule } from './daily-quote-routing.module';

import { DailyQuotePage } from './daily-quote.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyQuotePageRoutingModule
  ],
    declarations: [DailyQuotePage]
})
export class DailyQuotePageModule {}
