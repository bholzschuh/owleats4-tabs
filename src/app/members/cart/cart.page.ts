import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  rid: string;

  constructor(
    private cartservice: CartService,
  ) { }

  carts: Observable<Cart[]>;

  ngOnInit() {
  
      this.carts = this.cartservice.getCarts();
      this.cartservice.getCarts().subscribe(val => console.log(val));
  
    }
   
  }


