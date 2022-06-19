import { Component } from '@angular/core';

@Component({
  selector: 'app-your-journal',
  templateUrl: './your-journal.page.html',
  styleUrls: ['./your-journal.page.scss'],
})
export class YourJournalPage {

  today;

  constructor() {
    this.today = Date.now();
  }
}
