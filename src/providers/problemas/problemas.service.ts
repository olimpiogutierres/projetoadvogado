import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Problemas } from '../../models/problemas.model';

/*
  Generated class for the ProblemasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProblemasService extends BaseService {

  constructor(public http: HttpClient, public db: AngularFireDatabase) {
    super();
    console.log('Hello ProblemasProvider Provider');
  }

  create(problema:Problemas):Promise<void> {
    return this.db.object(`/users/`).set(problema).catch(this.handlePromiseError);   
  }
}
