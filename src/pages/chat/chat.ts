import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user/user.service';

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


  messages: string[] = [];
  pageTitle: string;
  sender: User;
  recipient: User;
  constructor(public navCtrl: NavController, public auth: AuthService, public navParams: NavParams, public userService: UserService) {
  }


  ionViewCanEnter(): Promise<any> {
    return this.auth.authenticated;
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle  = this.recipient.name;
    this.userService.currentUser.first().subscribe((currentUser:User)=>{this.sender = currentUser});
  }
  sendMessage(newMessage: string) {
    this.messages.push(newMessage);
  }

}
