import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController) { }

  async showLoader() {
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'custom-loading'
    });
    await this.loading.present();
  }

  async hideLoader() {
    await this.loading.dismiss();
  }

}
