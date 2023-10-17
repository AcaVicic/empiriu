import { Component, OnInit } from '@angular/core';
import { EmpiriuService, MementoMori } from 'src/app/services/empiriu.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-memento-mori',
  templateUrl: './memento-mori.page.html',
  styleUrls: ['./memento-mori.page.scss'],
})
export class MementoMoriPage implements OnInit {

  orangeSquares: number[];
  public squares: number[];
  mementoMori: MementoMori;

  constructor(private service: EmpiriuService, private loader: LoaderService) {
    
  }

  ngOnInit(): void {
    this.getMementoMori();
  }

  async getMementoMori(){
    await this.loader.showLoader();
    this.service.getMementoMori().subscribe(data => {
      this.mementoMori = data;
      this.orangeSquares = [];
      this.squares = [];
      for (let i = 0; i < data.filledNumber; i++) {
        this.orangeSquares.push(i);
      }
      for (let i = 0; i < 3916 - data.filledNumber; i++) {
        this.squares.push(i);
      }
      this.loader.hideLoader();
    });
  }

  async saveMementoMori(){
    await this.loader.showLoader();
    this.service.saveMementoMori().subscribe(() => {
      this.getMementoMori();
      this.loader.hideLoader();
    });
  }

  getDateCondition(){
    let now: Date = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    const timeDiffInMilliseconds = Math.abs(now.getTime() - new Date(this.mementoMori?.lastDate).getTime());
    const timeDiffInDays = timeDiffInMilliseconds / oneDayInMilliseconds;

    return timeDiffInDays < 7;
  }
}
