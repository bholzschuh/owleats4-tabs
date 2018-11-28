import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getOrCreateChangeDetectorRef } from '@angular/core/src/render3/di';
import { homedir } from 'os';
import { ModalController } from '@ionic/angular';
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private router: Router, private modalCtrl: ModalController, private CartService: CartService) { 
  }

  home(){
    let url = "/members/tabs/(home:home)";
    this.router.navigateByUrl(url);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
