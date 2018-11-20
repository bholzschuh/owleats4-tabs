import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],

})
export class CartPage implements OnInit {

  filledCarts: any[] = [];

  constructor(
    private cartservice: CartService,
  ) { }

  ngOnInit() {

    this.cartservice.getCarts().subscribe(res => {
      let carts: Cart[] = res;

      for(let cart of carts){
        this.cartservice.getItems(cart.cid).subscribe(res => {
          let items: Item[] = res;
          var item = items;
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


