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
  firstRun: boolean = true;

  constructor(
    private cartservice: CartService,
  ) { }

  ngOnInit() {

    this.cartservice.getCarts().subscribe(res => {
      this.carts = res;
      
      for(let cart of this.carts){
        this.cartservice.getItems(cart.cid).subscribe(res => {
          this.items = res;
          var item = this.items;
          var i = this.search(cart.cid,this.filledCarts);

          if(i == 200)
            this.filledCarts.push({cart,item});
          else
            this.filledCarts[i] = {cart,item};
          
        })
      }
    })
  
  }

  search(key, allCarts){
    for (var i=0; i < allCarts.length; i++) {
        if (allCarts[i].cart.cid === key) {
            return i;
        }
    }
    return 200;
}



}


