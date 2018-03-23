import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService extends BaseService {

  constructor(public http: HttpClient, public auth: AngularFireAuth) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: { email: string, password: string }):Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(user.email,user.password)
        .catch(this.handlePromiseError);
  }
}
