import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from '../models/item';
import { Cart } from '../models/cart';
import { AuthService } from '../../app/services/auth.service';
import { Vendor } from '../models/vendor'

import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    item = {} as Item;
    cart = {} as Cart;

    cartsCollection: AngularFirestoreCollection<Cart>;

    constructor(private afS: AngularFirestore,
                private auth: AuthService,
                ) { }

   addItems(item,rid,rname){

        let uid = this.auth.getUID();

        var data = {
                name: item.name,
                cost: item.cost,
                description: item.description,
                url: item.url
            };

            var data2 = {
                cid: rid,
                rname: rname
            };
    
            this.afS.collection("users/" + uid + "/carts/" + rid + "/items/").add(data);
            this.afS.doc("users/" + uid + "/carts/" + rid).set(data2);


   }


   getCarts(){

        let uid = this.auth.getUID();
        this.cartsCollection = this.afS.collection('users/' + uid + '/carts', ref => {
                return ref.orderBy('rname');
              });
              return this.cartsCollection.valueChanges();
   }
/*


   

        var data = {
            name: item.name,
            cost: item.cost,
        };

        this.afS.collection("carts").add(data);

                const id = this.afS.createId();

        return this.afS.doc('cart/${id}').set(item);

*/


}
