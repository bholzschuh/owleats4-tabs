import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ItemviewService } from '../../services/itemview.service';
import { Item } from '../../models/item';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.page.html',
  styleUrls: ['./itemview.page.scss'],
})
export class ItemviewPage implements OnInit {

  rid: string;
  iid: string;
  rname: string;
  quantity: string;
  item = {} as Item;

  constructor(
    private routerAct: ActivatedRoute,
    private itemservice: ItemviewService,
    private cartservice: CartService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    console.log('QUANTITITY: ' + this.quantity);
    this.rid = this.routerAct.snapshot.paramMap.get('rid');
    this.rname = this.routerAct.snapshot.paramMap.get('rname');
    this.iid = this.routerAct.snapshot.paramMap.get('iid');
    this.itemservice.getItemInfo(this.rid, this.iid).subscribe(res => {
      this.item = res;
    })
  }

  addItem(quantity) {
    if(!quantity) quantity = 1;
    console.log('quantitit: ' + quantity);
    this.cartservice.addItems(this.item, this.rid, this.rname,quantity);
    this.presentToast(quantity);
  }

  async presentToast(quantity) {

    if(quantity==1){
    const toast = await this.toastController.create({
      message: '1 ' + this.item.name + ' has been added to the cart.',
      duration: 1163
    });
    toast.present();
  }
    else{
      const toast = await this.toastController.create({
        message: quantity + ' ' + this.item.name + 's have been added to the cart.',
        duration: 1163
      }); 
      toast.present();
    }
    
  }

}