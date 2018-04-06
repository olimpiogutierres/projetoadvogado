
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Message } from '../../models/message.model';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageService extends BaseService {

  constructor(public http: HttpClient, public db: AngularFireDatabase) {
    super();
    console.log('Hello MessageProvider Provider');
  }

  create(message: Message, listMessages: AngularFireList<Message>):AngularFireList<Message> {
    listMessages.push(message);
    return listMessages;
  }

  getMessages(userId1: string, userId2: string):AngularFireList<Message> {
    return this.db.list(`/messages/${userId1}-${userId2}`, ref => ref.orderByChild('timestamp'));
  }


}
