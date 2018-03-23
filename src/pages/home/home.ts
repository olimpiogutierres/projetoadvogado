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

  public usuarios: any[]
  view: string = 'chats';
  // public usuarios:AngularFireList<any> 

  constructor(public authService: AuthService, public navCtrl: NavController, public user: UserService) {

    this.view = 'chats';


  }

  ionViewDidLoad() {
    console.log('passo 2  ');
    console.log(this.user.currentUser);

    var a = this.user.usersList.valueChanges().subscribe(data => { this.usuarios = data; });
    console.log(this.usuarios);
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  onSignup() {
    this.navCtrl.push(SignupPage)
  }

  sair() {
    this.user.afAuth.auth.signOut()
      .then(() => { console.log(`Usuário deslogado: ${this.user.currentUser.email}`) }
      ).catch(() => { console.log('Erro ao sair') });
  }

  onCreateChat(u: User) {
    console.log('create chat:' + u);
  }

}
