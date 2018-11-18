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
  item = {} as Item;

  constructor(
    private routerAct: ActivatedRoute,
    private itemservice: ItemviewService,
    private cartservice: CartService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.rid = this.routerAct.snapshot.paramMap.get('rid');
    this.rname = this.routerAct.snapshot.paramMap.get('rname');
    this.iid = this.routerAct.snapshot.paramMap.get('iid');
    //console.log('rid: ' + this.rid + ' iid: ' + this.iid);
    this.itemservice.getItemInfo(this.rid, this.iid).subscribe(res => {
      this.item = res;
      //console.log(this.item);
    })
  }

  addItem() {
    this.cartservice.addItems(this.item, this.rid, this.rname);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.item.name + ' has been added to the cart.',
      duration: 2000
    });
    toast.present();
  }

}