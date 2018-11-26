import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartPage } from '../cart/cart.page';
import { Cart } from '../../models/cart';
import { Item } from '../../models/item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  carts: any[] = [];

  constructor(
    private cartService: CartService,
  ) { 

  }

  ngOnInit() {    

    this.cartService.getCarts().subscribe(res => {
      let carts: Cart[] = res;

      for(let cart of carts){
        this.cartService.getItems(cart.cid).subscribe(res => {
          let items: Item[] = res;
          var item = items;
          var i = this.search(cart.cid,this.carts);

          if(i == 200)
            this.carts.push({cart,item});
          else
            this.carts[i] = {cart,item};

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

getTotal(cid){

  let i = this.search(cid,this.carts);
  var n = 0;
  console.log('getting total for ' + i);

  for(let item of this.carts[i].item){
    n = +n +  (+item.cost * +item.quantity);
    console.log('this item is ' + item.cost)
  }
  return n.toFixed(2);
  
}

getGrandTotal(){

  var n = 0;

  for(let cart of this.carts)
    n = +n + +this.getTotal(cart.cart.cid);

  return n;
  
}
}