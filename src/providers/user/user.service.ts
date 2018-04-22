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


  

  // getUser(user: User) {
  //   return this.db.list('/users', ref => ref.orderByChild('username').equalTo(user.email));
  // }

  edit(user:{name:string, username:string, photo:string}){
    return this.userAtivo.update(user).catch(this.handlePromiseError);
  }

  getUserById(userId:string): AngularFireObject<User>{
    return this.db.object(`/users/${userId}`);
  }


  private setUsers() {
    this.usersList = this.db.list('/users', ref => ref.orderByChild('name'));
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
