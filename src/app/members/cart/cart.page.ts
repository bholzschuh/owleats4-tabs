import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { Item } from '../../models/item';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],

})
export class CartPage implements OnInit {

  carts: Cart[];
  items: Item[];
  filledCarts: any[] = [];

  constructor(
    private cartservice: CartService,
    private routerAct: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.populateCart();
  
  }

  populateCart(){

    this.cartservice.getCarts().subscribe(res => {
      this.carts = res;

      for(let cart of this.carts){
        var obc = this.cartservice.getItems(cart.cid);

        this.cartservice.getItems(cart.cid).subscribe(res => {
          this.items = res;
          var item = this.items;
          var arr = {cart,item};
          this.filledCarts.push(arr);

        })
      }
    })
  }
}


