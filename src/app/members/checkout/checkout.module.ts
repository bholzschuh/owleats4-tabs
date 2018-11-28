import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, NavController, ModalController } from '@ionic/angular';

import { CheckoutPage } from './checkout.page';
import { timingSafeEqual } from 'crypto';
import { ModalPage } from '../modal/modal.page';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


const routes: Routes = [
  {
    path: '',
    component: CheckoutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {

  constructor(private nav: NavController, private modalCtrl: ModalController, ){
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps:{
        
      }
    });
    return await modal.present();
  }
}
