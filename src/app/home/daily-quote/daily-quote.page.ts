import {Component, OnInit} from '@angular/core';
import {EmpiriuService, Quote} from "../../services/empiriu.service";
import {LoadingController} from "@ionic/angular";
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-daily-quote',
  templateUrl: './daily-quote.page.html',
  styleUrls: ['./daily-quote.page.scss'],
})


export class DailyQuotePage implements OnInit {
  quote: Quote;
  isDataAvailable: boolean = false;
  loading: HTMLIonLoadingElement;

  constructor(private service: EmpiriuService, private loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.loadQuote();
  }

  async loadQuote() {
    await this.loaderService.showLoader();

    this.service.getDailyQuote().subscribe(res => {
        this.loaderService.hideLoader();
        this.quote = res;
        this.isDataAvailable = true;
      }
    );
  }
}
