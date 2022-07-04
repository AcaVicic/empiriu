import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {AlertController, IonTextarea, LoadingController, PickerController} from "@ionic/angular";
import {DailyJournal, EmpiriuService} from "../../services/empiriu.service";

@Component({
  selector: 'app-your-journal',
  templateUrl: './your-journal.page.html',
  styleUrls: ['./your-journal.page.scss'],
})
export class YourJournalPage implements OnInit, AfterViewInit {

  viewDate;
  @ViewChild(IonTextarea) textarea: IonTextarea;
  length;
  date: Date;
  now: Date;
  journal: DailyJournal;
  isDataAvailable: boolean = false;
  isHidden: boolean = false;
  onLoadJournal: string;

  constructor(private pickerController: PickerController, private service: EmpiriuService, private loadingCtrl: LoadingController, private alertController: AlertController) {
    this.now = new Date();
    this.viewDate = new Date();
    this.length = 0;
  }

  ngAfterViewInit(): void {
    this.loadToday();
  }

  loadToday(): void {
    this.loadJournal(`${this.now.getDate()}.${this.now.getMonth() + 1}.${this.now.getFullYear()}.`);
  }

  async openPicker() {
    const picker = await this.pickerController.create({
      columns: [
        {
          name: 'day',
          options: [
            {
              text: '1',
              value: 1
            },
            {
              text: '2',
              value: 2
            },
            {
              text: '3',
              value: 3
            },
            {
              text: '4',
              value: 4
            },
            {
              text: '5',
              value: 5
            },
            {
              text: '6',
              value: 6
            },
            {
              text: '7',
              value: 7
            },
            {
              text: '8',
              value: 8
            },
            {
              text: '9',
              value: 9
            },
            {
              text: '10',
              value: 10
            },
            {
              text: '11',
              value: 11
            },
            {
              text: '12',
              value: 12
            },
            {
              text: '13',
              value: 13
            },
            {
              text: '14',
              value: 14
            },
            {
              text: '15',
              value: 15
            },
            {
              text: '16',
              value: 16
            },
            {
              text: '17',
              value: 17
            },
            {
              text: '18',
              value: 18
            },
            {
              text: '19',
              value: 19
            },
            {
              text: '20',
              value: 20
            },
            {
              text: '21',
              value: 21
            },
            {
              text: '22',
              value: 22
            },
            {
              text: '23',
              value: 23
            },
            {
              text: '24',
              value: 24
            },
            {
              text: '25',
              value: 25
            },
            {
              text: '26',
              value: 26
            },
            {
              text: '27',
              value: 27
            },
            {
              text: '28',
              value: 28
            },
            {
              text: '29',
              value: 29
            },
            {
              text: '30',
              value: 30
            },
            {
              text: '31',
              value: 31
            }
          ]
        },
        {
          name: 'month',
          options: [
            {
              text: 'January',
              value: 0
            },
            {
              text: 'February',
              value: 1
            },
            {
              text: 'March',
              value: 2
            },
            {
              text: 'April',
              value: 3
            },
            {
              text: 'May',
              value: 4
            },
            {
              text: 'June',
              value: 5
            },
            {
              text: 'July',
              value: 6
            },
            {
              text: 'August',
              value: 7
            },
            {
              text: 'September',
              value: 8
            },
            {
              text: 'October',
              value: 9
            },
            {
              text: 'November',
              value: 10
            },
            {
              text: 'December',
              value: 11
            }
          ]
        },
        {
          name: 'year',
          options: [
            {
              text: '2021',
              value: 2021
            },
            {
              text: '2022',
              value: 2022
            }
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.date = new Date(value.year.value, value.month.value, value.day.value);

            if (this.now.getFullYear() > this.date.getFullYear() || this.now.getMonth() + 1 > this.date.getMonth() + 1 || this.now.getDate() > this.date.getDate()) {
              this.viewDate = this.date;
              this.textarea.readonly = true;
              this.isHidden = true;
              this.loadJournal(`${value.day.value}.${value.month.value + 1}.${value.year.value}.`)
            } else if (this.now.getFullYear() == this.date.getFullYear() && this.now.getMonth() + 1 == this.date.getMonth() + 1 && this.now.getDate() == this.date.getDate()) {
              this.viewDate = this.date;
              this.textarea.readonly = false;
              this.isHidden = false;
              this.loadToday();
              console.log(this.textarea.readonly)
            }
            console.log(this.date)
          }
        }
      ]
    });
    await picker.present();
  }

  getTextLength() {
    this.journal.text = this.textarea.value;
  }

  ngOnInit(): void {

  }

  async loadJournal(date: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });
    await loading.present();
    console.log(date)
    this.service.getJournal(date).subscribe(res => {
        loading.dismiss();
        this.journal = res;
        this.onLoadJournal = res.text;
        this.isDataAvailable = true;
      }
    );
  }

  async saveJournal() {
    if (this.onLoadJournal.length == 0 && this.journal.text.length > 0) {
      this.journal.date = this.now;
      this.journal.user.id = 1;
      this.service.postJournal(this.journal);
      const alert = await this.alertController.create({
        message: "Journal successfully saved!",
        buttons: [
          {
            text: 'OK',
            handler(){
              window.location.reload();
            }
          }
        ]
      });
      await alert.present();
    } else if (this.onLoadJournal.length > 0 && this.journal.text.length > 0 && this.onLoadJournal != this.journal.text) {
      this.service.putJournal(this.journal);
      const alert = await this.alertController.create({
        message: "Journal successfully changed!",
        buttons: [
          {
            text: 'OK',
            handler(){
              window.location.reload();
            }
          }
        ]
      });
      await alert.present();
    } else if (this.onLoadJournal.length > 0 && this.journal.text.length == 0) {
      this.service.deleteJournal(this.journal.id)
      const alert = await this.alertController.create({
        message: "Journal successfully deleted!",
        buttons: [
          {
            text: 'OK',
            handler(){
              window.location.reload();
            }
          }
        ]
      });
      await alert.present();
    } else if (this.onLoadJournal.length > 0 && this.journal.text.length > 0 && this.onLoadJournal == this.journal.text) {
      const alert = await this.alertController.create({
        message: "Journal wasn't changed!",
        buttons: [
          {
            text: 'OK',
            role: "cancel"
          }
        ]
      });
      await alert.present();
    } else if (this.onLoadJournal.length == 0 && this.journal.text.length == 0) {
      const alert = await this.alertController.create({
        message: "Journal is empty!",
        buttons: [
          {
            text: 'OK',
            role: "cancel"
          }
        ]
      });
      await alert.present();
    }
  }
}
