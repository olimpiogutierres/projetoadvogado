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

  constructor(public authService: AuthService, public navCtrl: NavController, user: UserService, public chatService: ChatService) {
    this.view = 'chats';
    this.user = user;
    console.log('entrou no construtor');
  }

  ionViewDidLoad() {

    let userAtivo: AngularFireObject<User> = this.user.userAtivo;


    console.log('user1111', userAtivo);


    this.user.userAtivo.valueChanges().subscribe(userAtivo => {

      this.user.mapListKeys<User>(this.user.usersList)
        .subscribe((data: User[]) => {


          //console.log(data);

          this.usuarios = data;

          //console.log(userAtivo.email);

          this.usuarios = this.usuarios.filter(d => d.email !== userAtivo.email);


        });
    });


    this.chats = this.chatService.chats;
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


    // console.log('recipientkey', recipientUser.key());


    // this.user.userAtivo.valueChanges().first().subscribe((currentUser: User) => {
    //   let keyCurrentUser: any;
    //   this.user.userAtivo.snapshotChanges().map(c => ({ keyCurrentUser: c.key }));



    //   this.chatService.getDeepChat(keyCurrentUser, recipientUser.key());
    // });

    // let a = this.user.userAtivo.snapshotChanges().map(action => {
    //   const $key = action.payload.key;

    //   //console.log('kwy', $key);
    //   const data = { $key, ...action.payload.val() };
    //   return data;
    // }).subscribe(item => console.log(item.$key));


    //console.log('data',);


    console.log(recipientUser);
    console.log(this.user.mapObjectKey<User>(this.user.userAtivo));

    this.user.mapObjectKey<User>(this.user.userAtivo).first()
      .subscribe((currentUser: User) => {
        console.log('first user', currentUser);

        this.chatService.mapObjectKey<Chat>(this.chatService.getDeepChat(currentUser.$key, recipientUser.$key))
          .first()
          .subscribe((chat: Chat) => {

            console.log('entrou chat', chat.$key === null);
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

}
