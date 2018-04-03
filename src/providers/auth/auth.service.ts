import { FirebaseAuth } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';


@Injectable()
export class AuthService extends BaseService {

  constructor(public http: HttpClient, public auth: AngularFireAuth) {
    super();
   // console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: { email: string, password: string }): Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signinWithEmail(user: { email: string, password: string }): Promise<boolean> {

    return this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((authState: AngularFireAuth) => {
        return authState != null;
      }).catch(this.handlePromiseError);

  }

  logout(): Promise<void> {
    return this.auth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.auth.currentUser ? resolve(true) : reject(false);

    })
  }
}
