import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatService extends BaseService {

  constructor(public http: HttpClient) {
    super();
    console.log('Hello ChatProvider Provider');
  }

}
