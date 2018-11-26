import { Component, OnInit } from '@angular/core';
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

  filledCarts: any[] = [];

  constructor(
    private cartservice: CartService,
    private route: Router,
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
          else{
            this.filledCarts[i] = {cart,item};
            console.log(this.filledCarts);
            if(this.filledCarts[i].item.length == 0)
              this.filledCarts.splice(i,1);
              if(this.filledCarts.length == 0)
                this.filledCarts = [];
        
          }
          
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

remove(itemID, cid){ this.cartservice.deleteItem(itemID, cid);}


checkout() {

  let url = "members/tabs/(cart:checkout)";
  this.route.navigateByUrl(url);
}

getCart(){return this.filledCarts;}

}