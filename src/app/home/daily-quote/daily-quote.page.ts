import {AfterViewInit, Component} from '@angular/core';
import {EmpiriuService} from "../../services/empiriu.service";

@Component({
  selector: 'app-daily-quote',
  templateUrl: './daily-quote.page.html',
  styleUrls: ['./daily-quote.page.scss'],
})
export class DailyQuotePage implements AfterViewInit{
  results;

  constructor(private service: EmpiriuService) {
  }

  ngAfterViewInit(): void {
    this.results = this.service.searchData();
  }

}
