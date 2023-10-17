import {Component, OnInit} from '@angular/core';
import {AlertController, PickerController} from "@ionic/angular";
import {DailyJournal, EmpiriuService} from "../../services/empiriu.service";
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-your-journal',
  templateUrl: './your-journal.page.html',
  styleUrls: ['./your-journal.page.scss'],
})
export class YourJournalPage implements OnInit {

  journals: DailyJournal[];

  constructor(private pickerController: PickerController, private service: EmpiriuService, private loaderService: LoaderService, private alertController: AlertController) {
    
  }

  ngOnInit(): void {
    this.getAllJournals();
  }

  async getAllJournals(){
    await this.loaderService.showLoader();
    this.service.getAllJournals().subscribe( data => {
      this.journals = data;
      this.loaderService.hideLoader();
    });
  }

  getYear(journal: DailyJournal){
    return new Date(journal.date).getFullYear();
  }
  
}
