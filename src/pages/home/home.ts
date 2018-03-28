import { ChatService } from './../../providers/chat/chat.service';
import { ChatPage } from './../chat/chat';
import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFireList } from 'angularfire2/database';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
// import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
//import { Observable } from '@firebase/util';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuarios: User[];

  view: string = 'chats';
  // public usuarios:AngularFireList<any> 

  constructor(public authService: AuthService, public navCtrl: NavController, public user: UserService, public chatService:ChatService) {
    this.view = 'chats';
  }

  ionViewDidLoad() {
    let userAtivo: User = this.user.userAtivo;


    console.log('user1111',userAtivo);


    this.user.currentUser.subscribe(userAtivo => {
      this.user.usersList.valueChanges()
        .subscribe(data => {
          this.usuarios = data;
          
          this.usuarios = this.usuarios.filter(d => d.email !== userAtivo.email);
         
          
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
      .then(() => { console.log(`Usuário deslogado: ${this.user.currentUser}`) }
      ).catch(() => { console.log('Erro ao sair') });
  }

  onCreateChat(recipientUser: User) {


  



    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser
    });
  }

}
