import { Message } from './../../models/message.model';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user/user.service';
import { AngularFireList } from 'angularfire2/database';
import { MessageService } from '../../providers/message/message.service';
import firebase from 'firebase';
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


  messages: AngularFireList<Message>;
  pageTitle: string;
  sender: User;
  recipient: User;
  constructor(public navCtrl: NavController, public messageService: MessageService, public auth: AuthService, public navParams: NavParams, public userService: UserService) {
  }


  ionViewCanEnter(): Promise<any> {
    return this.auth.authenticated;
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.userAtivo.valueChanges().first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;
        this.messages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key);

        this.messageService.mapListKeys<Message>(this.messages)
          .subscribe((messages: Message[]) => {
            if (messages.length === 0) {
              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);

            }
          });

      });
  }
  sendMessage(newMessage: string) {

    if (newMessage) {
      let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      this.messageService.create(
        new Message(this.sender.$key, newMessage, timestamp),
        this.messages
      );
    }

    //this.messages.push(newMessage);
  }

}
