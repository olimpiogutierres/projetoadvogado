import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages:string[]=[];
  constructor(public navCtrl: NavController, public auth:AuthService, public navParams: NavParams) {
  }


  ionViewCanEnter():Promise<any>{
   return this.auth.authenticated;
  }

  sendMessage(newMessage:string){
    this.messages.push(newMessage);
  }

}
