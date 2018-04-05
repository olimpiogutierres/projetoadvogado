import { User } from './../../models/user.model';
import { UserService } from './../user/user.service';
import { Chat } from './../../models/chat.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class ChatService extends BaseService {



  constructor(public http: HttpClient, public db: AngularFireDatabase, public authService: AuthService) {
    super();

    console.log('entrou chatservice');
    this.setChats();
  }

  chats: Chat[];


  setChats() {

    console.log('setChats');




    this.mapListKeys(this.db.list(`/chats/${this.authService.auth.auth.currentUser.uid}`,
      ref => ref.orderByChild('timestamp'))).subscribe((data: Chat[]) => {
        this.chats = data;
        console.log(data); console.log(this.chats)
      });

    console.log('saiu setchats', this.chats);

    console.log('saiu setchats reverse', this.chats);




    // this.user.mapObjectKey<User>(this.user.userAtivo)
    //   .subscribe((user: User) => {

    //     console.log('entrou setChats');
    //     this.chats = this.mapListKeysType<Chat>(this.db.list('chats'));

    //     console.log(this.chats);

    //   });
  }

  create(chat: Chat, userId1: string, userId2: string): Promise<void> {

    console.log('chat', chat)
    console.log('userId1', userId1)
    console.log('userId2', userId2)
    return this.db.object(`/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string): AngularFireObject<Chat> {
    console.log('getdeepchat')
    return this.db.object(`/chats/${userId1}/${userId2}`);
  }

}
