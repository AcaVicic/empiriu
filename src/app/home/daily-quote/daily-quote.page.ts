import {Component, OnInit} from '@angular/core';
import {EmpiriuService, Quote} from "../../services/empiriu.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-daily-quote',
  templateUrl: './daily-quote.page.html',
  styleUrls: ['./daily-quote.page.scss'],
})


export class DailyQuotePage implements OnInit {
  quote: Quote;
  isDataAvailable: boolean = false;

  constructor(private service: EmpiriuService, private loadingCtrl: LoadingController) {

  }

  ngOnInit(): void {
    this.loadQuote();
  }

  async loadQuote() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });
    await loading.present();

    this.service.getDailyQuote().subscribe(res => {
        loading.dismiss();
        this.quote = res;
        this.isDataAvailable = true;
      }
    );
  }
}
