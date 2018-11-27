import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  user = {} as User;

  constructor(
    private afS: AngularFirestore,
  ) { }

  addUser(user, uid) {
    this.user.uid = uid;
    this.user.first = user.first;
    this.user.last = user.last;
    this.user.email = user.email;
    this.user.phone = user.phone;
    this.user.znumber = user.znumber;
    this.afS.collection("users").doc(uid).set(this.user);
  }
}
