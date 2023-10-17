import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MementoMoriPageRoutingModule } from './memento-mori-routing.module';

import { MementoMoriPage } from './memento-mori.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MementoMoriPageRoutingModule
  ],
  declarations: [MementoMoriPage]
})
export class MementoMoriPageModule {}
