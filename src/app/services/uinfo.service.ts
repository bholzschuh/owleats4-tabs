import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UinfoService {

  userDocument: AngularFirestoreDocument<User>;

  constructor(
    private db: AngularFirestore,
  ) { }

  getInfo(uid) {
    this.userDocument = this.db.doc('users/' + uid);
    return this.userDocument.valueChanges();
  }

}
