import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from '../models/item';
import { AuthService } from '../../app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    item = {} as Item;


    constructor(private afS: AngularFirestore,
                private auth: AuthService) { }

   addItems(item,rid){

           let uid = this.auth.getUID();

        var data = {
                name: item.name,
                cost: item.cost,
                pic: item.url
            };
    
            this.afS.collection("users/" + uid + "/carts/" + rid + "/items/").add(data);


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

        /*
        this.item.name = item.name;
        this.item.cost = item.cost;
        this.item.description = item.description;
        this.item.url = item.url;

       // var setDoc = this.afS.collection('cart').doc('carts').set(data);
        this.afS.collection("cart").doc('carts').set(this.item);
        */



}
