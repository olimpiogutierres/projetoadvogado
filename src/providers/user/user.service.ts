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
  public userAtivo: User;
  public authState: Observable<firebase.User>
  public usersList: AngularFireList<any>
  public currentUser: Observable<User> = null;
  public currentUid: string;
  // public user1: AngularFireObject<User>;


  constructor(public http: HttpClient, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    super();
    console.log('Hello UserProvider Provider');
    // let currentUid: string;


    //this.userAtivo = this.user.currentUser;
    //this.authState =;
    // console.log(this.af.)
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.db.object<User>(`/users/${user.uid}`).valueChanges().subscribe((userAtivo: User) => { this.userAtivo = userAtivo });
        let a = this.db.object<User>(`/users/${user.uid}`).valueChanges();


        //console.log(this.currentUser)
        //console.log('subscribe user:' ,a.valueChanges().subscribe((u:User)=>{console.log(u.)}));
        console.log('deu certo', user.uid);
        this.currentUid = user.uid;
      } else {

        this.currentUser = null;

        console.log('não deu certo', user.uid);
      }
    });

    this.setUsers(this.currentUid);


  }




  private setUsers(uidToExclude: string) {
    this.usersList = this.db.list('/users', ref => ref.orderByChild('name')); 

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

  // list(){
  //   this.afAuth.app.database.
  // }


}
