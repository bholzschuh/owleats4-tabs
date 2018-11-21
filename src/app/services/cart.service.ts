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
  uid: string;

  itemsCollection: AngularFirestoreCollection<Item>;
  cartsCollection: AngularFirestoreCollection<Cart>;

  constructor(
    private afS: AngularFirestore,
    private auth: AuthService,
  ) {
    this.uid = this.auth.getUID();
  }

  addItems(item, rid, rname) {

    var data = {
      name: item.name,
      cost: item.cost,
      description: item.description,
      url: item.url,
      iid: item.iid,
    };

    var data2 = {
      cid: rid,
      rname: rname
    };

    this.afS.collection("users/" + this.uid + "/carts/" + rid + "/items/").doc(item.iid).set(data);
    this.afS.doc("users/" + this.uid + "/carts/" + rid).set(data2);

  }

  deleteItem(itemID,cid){

    this.afS.collection('users/' + this.uid + '/carts/' + cid + '/items').doc(itemID).delete();
    this.afS.collection('users/' + this.uid + '/carts/' + cid + '/items').get().subscribe(snap => {
    var size = snap.size;
      if(size == 0)
      this.afS.collection('users/' + this.uid + '/carts/').doc(cid).delete();

   });
   
  }

  getCarts() {
    this.cartsCollection = this.afS.collection('users/' + this.uid + '/carts', ref => {
      return ref.orderBy('rname');
    });

    return this.cartsCollection.valueChanges();
  }

  getItems(cid) {

    this.itemsCollection = this.afS.collection('users/' + this.uid + '/carts/' + cid + '/items', ref => {
      return ref.orderBy('name');
    });

    return this.itemsCollection.valueChanges();
  }

}
