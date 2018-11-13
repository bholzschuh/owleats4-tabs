import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { CreateuserService } from './createuser.service';

import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(
    private afAuth: AngularFireAuth,
    private plt: Platform,
    private userservice: CreateuserService,
  ) {
    this.plt.ready().then(() => {
      this.checkFireAuth();
    })
  }

  // Starts the firebase session and on failure returns a message
  async login(value) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
      if (result) {
        this.authenticationState.next(true);
      }
    } catch (e) {
      return this.checkErrors(e.code)
    }
  }

  // Removes authtoken and ends firebase session
  logout() {
    this.authenticationState.next(false);
    this.afAuth.auth.signOut();
  }

  // Returns boolean based on authentication
  isAuthenticated() {
    return this.authenticationState.value;
  }

  // Check if firebase session exists and manages authtoken accordingly
  checkFireAuth() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authenticationState.next(true);
      }
      else {
        this.authenticationState.next(false);
      }
    })
  }

  // Checks errors of login
  checkErrors(error: String) {
    if (error == "auth/invalid-email") {
      return "Invalid Email Address";
    }
    else if (error == "auth/user-not-found" || error == "auth/wrong-password") {
      return "Incorrect Email/Password";
    }
    else if (error == "auth/argument-error") {
      return "Please fill out both fields";
    }
    else if (error == "auth/email-already-in-use") {
      return "That email is already in use";
    }
  }

  getUID() {
    return this.afAuth.auth.currentUser.uid;
  }
  getEmail() {
    return this.afAuth.auth.currentUser.email;
  }

  async registerEmailPass(value) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
      if (result) {
        this.authenticationState.next(true);
        this.userservice.addUser(value, this.getUID());
      }
    } catch (e) {
      console.error(e);
      return this.checkErrors(e.code);
    }
  }

}
