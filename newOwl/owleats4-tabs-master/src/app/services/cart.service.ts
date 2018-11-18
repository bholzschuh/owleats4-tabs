import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from '../models/item';
import { Cart } from '../models/cart';
import { AuthService } from '../../app/services/auth.service';

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



   //    this.rid = this.routerAct.snapshot.paramMap.get('rid');

   addItems(item,rid){

           let uid = this.auth.getUID();

        var data = {
                name: item.name,
                cost: item.cost,
                description: item.description,
                url: item.url
            };

           // String name = 

            var data2 = {
                cid: rid,
                rname: this.afS.doc('restaurants/' + rid).ref.get(name)
            };
    
            this.afS.collection("users/" + uid + "/carts/" + rid + "/items/").add(data);
            this.afS.doc("users/" + uid + "/carts/" + rid).set(data2);


   }


   getCarts(){

        let uid = this.auth.getUID();
        this.cartsCollection = this.afS.collection('users/' + uid + '/carts', ref => {
                return ref.orderBy('cid');
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
