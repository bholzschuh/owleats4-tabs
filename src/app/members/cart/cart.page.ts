import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  rid: string;
  carts: Observable<Cart[]>;
  items: Observable<Item[]>;

  constructor(
    private cartservice: CartService,
    private routerAct: ActivatedRoute,
  ) { }

  ngOnInit() {

      this.carts = this.cartservice.getCarts();
      this.cartservice.getCarts().subscribe(val => console.log(val));
      this.items = this.cartservice.getItems(0); 

    }

    updateItems(rid){
      this.items = this.cartservice.getItems(rid); 
    }
  }


