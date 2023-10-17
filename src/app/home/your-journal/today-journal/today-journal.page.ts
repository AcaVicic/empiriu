import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTextarea } from '@ionic/angular';
import { DailyJournal, EmpiriuService } from 'src/app/services/empiriu.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-today-journal',
  templateUrl: './today-journal.page.html',
  styleUrls: ['./today-journal.page.scss'],
})
export class TodayJournalPage implements OnInit, AfterViewInit {

  text;
  today: Date;
  journal: DailyJournal; 

  constructor(private service: EmpiriuService, private loaderService: LoaderService, private router: Router) { }

  ngAfterViewInit(): void {
    console.log(this.text)
    this.getJournal();
  }

  ngOnInit() {
    this.today = new Date();
  }

  async getJournal(){
    await this.loaderService.showLoader();
    this.service.getJournal(`${this.today.getDate()}.${this.today.getMonth() + 1}.${this.today.getFullYear()}`).subscribe(data => {
      this.journal = data;
      console.log(data)
      this.loaderService.hideLoader();
    });
  }

  async saveJournal(){
    
    if(this.journal.id == 0){
      console.log(this.service.getUserValue())
      this.journal.user = this.service.getUserValue();
      this.journal.date = this.today;
      await this.loaderService.showLoader();
      this.service.postJournal(this.journal).subscribe(data => {
        console.log(data)
        this.loaderService.hideLoader();
        this.router.navigateByUrl('/home/your-journal').then(() => {
          window.location.reload();
        });
      });
    }
    else{
      if(this.journal.text.length == 0){
        await this.loaderService.showLoader();
        this.service.deleteJournal(this.journal.id).subscribe(data => {
          this.loaderService.hideLoader();
          this.router.navigateByUrl('/home/your-journal').then(() => {
            window.location.reload();
          });
        });
      }
      else{
        await this.loaderService.showLoader();
        this.service.putJournal(this.journal).subscribe(data => {
          this.loaderService.hideLoader();
          this.router.navigateByUrl('/home/your-journal').then(() => {
            window.location.reload();
          });
        });
      }
    }
    
  }

}
