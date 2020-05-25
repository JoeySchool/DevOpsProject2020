import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app'
import { User } from 'firebase'
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  boolLogged: boolean;
  user: User;
  userData: any;

  constructor(public afAuth : AngularFireAuth,
    public ngZone: NgZone,
    public router: Router,
    public afs: AngularFirestore,) {

      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          localStorage.setItem('id_token', this.userData.xa);


          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          localStorage.setItem('id_token', null);
          this.userData = null;
          JSON.parse(localStorage.getItem('user'));
          
        }
      })
   }

  async GoogleAuth(){
    return this.AuthLogin(new auth.GoogleAuthProvider())
  }
  AuthLogin(provider){
    return this.afAuth.signInWithPopup(provider).then((result)=>{
      this.ngZone.run(() => {
        this.router.navigate(['case']);
      })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    })
  }

  SetUserData(user) {
    console.log(user)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

    // Sign out 
    SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('id_token');
        this.router.navigate(['sign-in']);
      })
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }
}
