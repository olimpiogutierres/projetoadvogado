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



@Injectable()
export class UserService extends BaseService {
  public userAtivo: AngularFireObject<User>;

  public usersList: AngularFireList<User>

  constructor(public http: HttpClient, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    super();

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userAtivo = this.db.object<User>(`/users/${user.uid}`);
      }
      else {
        this.userAtivo = null;
      }
    });

    this.setUsers();
  }


  public obterKey(user: User): string {

    let a: string;
    this.db.list('/users', ref => ref.orderByChild('email').equalTo(user.email))
      .snapshotChanges()
      .map(action => {
        const $key = action[0].key;
        return $key;
      })
      .subscribe(d => a = d.toString());



    // this.db.list('/users', ref => ref.orderByChild('email').equalTo(user.email)).snapshotChanges()
    // .map(action => {
    //   const $key = action.key;

    //   //console.log('kwy', $key);
    //   const data = { $key, ...action.payload.val() };
    //   return data;
    // }).subscribe(item => console.log(item.$key));
    return a;
  }


  getUser(user:User){
     return this.db.list('/users', ref => ref.orderByChild('username').equalTo(user.email));
  }

  private setUsers() {
    this.usersList = this.db.list('/users', ref => ref.orderByChild('name'));
  }

  getAuthState() {
    //return this.authState;
  }

  logoutWithGoogle() {
    return this.afAuth.auth.signOut();
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider());
  }

  create(user: User, uuid: string): Promise<void> {
    console.log(uuid);
    console.log(user);
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

}
