// import { Observable } from '@firebase/util';
import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import '@firebase/database'
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { ThenableReference } from '@firebase/database-types';
import { BaseService } from '../base.service';

import 'rxjs/add/operator/map';


/* 
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService extends BaseService {
  public authState: Observable<firebase.User>
  public usersList: AngularFireList<any>
  public currentUser: firebase.User = null;

  constructor(public http: HttpClient, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    super();
    console.log('Hello UserProvider Provider');
    this.usersList = this.db.list('/users');



    this.authState = this.afAuth.authState;
    // console.log(this.af.)
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;

      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState() {
    return this.authState;
  }

  logoutWithGoogle() {
    return this.afAuth.auth.signOut();
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider());
  }

  create(user: User, uuid: string): Promise<void> {
    return this.db.object(`/users/${uuid}`).set(user).catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.db.list('/users', ref => ref.orderByChild('username').equalTo(username))
      .valueChanges()
      .map((users: User[]) => {
        return users.length > 0;
      })
      .catch(this.handleObservableError);


  }

  // list(){
  //   this.afAuth.app.database.
  // }


}
