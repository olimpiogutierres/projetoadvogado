
import { User } from './../../models/user.model';
import { ChatService } from './../../providers/chat/chat.service';
import { ChatPage } from './../chat/chat';
import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Chat } from '../../models/chat.model';
// import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
//import { Observable } from '@firebase/util';
import firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuarios: User[];

  public chats: Chat[];

  view: string = 'chats';
  // public usuarios:AngularFireList<any> 

  public user: UserService;
  public chatService: ChatService;

  constructor(public authService: AuthService, public navCtrl: NavController, user: UserService, chatService: ChatService) {
    this.view = 'chats';
    this.user = user;
    this.chatService = chatService;
    console.log('entrou no construtor');
  }

  ionViewDidEnter() {
    this.chatService.setChats();
  }
  ionViewDidLoad() {

    // let userAtivo: AngularFireObject<User> = this.user.userAtivo;


    // console.log('user1111', userAtivo);

    console.log(this.user.userAtivo);



    this.user.userAtivo.valueChanges().subscribe(userAtivo => {

      this.user.mapListKeys<User>(this.user.usersList)
        .subscribe((data: User[]) => {

          this.usuarios = data;
          this.usuarios = this.usuarios.filter(d => d.email !== userAtivo.email);

          this.chatService.mapListKeys<Chat>(this.chatService.chats)
            .subscribe((data1: Chat[]) => {
              this.chats = data1;
            });
        });
    });

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  onSignup() {
    this.navCtrl.push(SignupPage)
  }

  sair() {
    this.user.afAuth.auth.signOut()
      .then(() => {
        //console.log(`Usuário deslogado: ${this.user.currentUser}`) 
      }
      ).catch(() => { console.log('Erro ao sair') });
  }

  onCreateChat(recipientUser: User) {

    this.user.mapObjectKey<User>(this.user.userAtivo).first()
      .subscribe((currentUser: User) => {


        this.chatService.mapObjectKey<Chat>(this.chatService.getDeepChat(currentUser.$key, recipientUser.$key))
          .first()
          .subscribe((chat: Chat) => {


            if (chat.$key === null) {

              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, recipientUser.name, '');
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, '');
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key);
            }
            else {

            }

          })
      });




    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser
    });
  }

  onChatOpen(chat: Chat) {
    let recipientUserId: string = chat.$key;

    console.log(recipientUserId)
    var a = this.user.getUserById(recipientUserId)
      .valueChanges().first()
      .subscribe((users: User[]) => {

        let user: User = users[0];

        this.navCtrl.push(ChatPage, {
          recipientUser: user
        });
      })
    // .subscribe((user: User[]) => {

    //   console.log(user)
    //   console.log(user[0])
    //   // this.navCtrl.push(ChatPage, {
    //   //   recipientUser: 
    //   // })
    // });
  }

}
