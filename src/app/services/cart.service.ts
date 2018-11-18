import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from '../models/item';
import { Cart } from '../models/cart';
import { AuthService } from '../../app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    item = {} as Item;
    cart = {} as Cart;

    itemsCollection: AngularFirestoreCollection<Item>;
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

   getItems(rid) {

        let uid = this.auth.getUID();

        this.itemsCollection = this.afS.collection('users/' + uid + '/carts/' + rid + '/items', ref => {
          return ref.orderBy('name');
        });
        return this.itemsCollection.valueChanges();
      }

}
