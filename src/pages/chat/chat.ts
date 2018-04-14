import { ChatService } from './../../providers/chat/chat.service';
import { Chat } from './../../models/chat.model';
import { Message } from './../../models/message.model';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth/auth.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
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

  @ViewChild('input') inputMessage ;
  @ViewChild(Content) content: Content;
  public messages: Message[] = [];
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(public navCtrl: NavController, public chatService: ChatService, public messageService: MessageService, public auth: AuthService, public navParams: NavParams, public userService: UserService) {


    console.log('constructor chat');
  }


  ionViewCanEnter(): Promise<any> {
    return this.auth.authenticated;
  }

  ionViewDidLoad() {
    
    this.scrollToBottom();
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;

    this.userService.mapObjectKey<User>(this.userService.userAtivo)
      .subscribe((current: User) => {
        this.sender = current;

        let currentMessages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key)
        this.messageService.mapListKeys<Message>(currentMessages)
          .subscribe((messages: Message[]) => {
            this.messages = messages;
          });




      });
  }


  sendMessage(newMessage: string) {

    if (newMessage) {
      console.log(this.sender)
      console.log(this.recipient)
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      console.log(currentTimestamp);
      this.messageService.create(
        new Message(newMessage, currentTimestamp, this.sender.$key),
        this.messages, this.sender.$key, this.recipient.$key
      );


      this.chatService.getDeepChat(this.sender.$key, this.recipient.$key)
        .update({ timestamp: currentTimestamp, lastMessage: newMessage });
      this.chatService.getDeepChat(this.recipient.$key, this.sender.$key)
        .update({ timestamp: currentTimestamp, lastMessage: newMessage });


        this.scrollToBottom();

    }
    

    //this.messages.push(newMessage);
  }

  private scrollToBottom(duration?: number) {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(duration | 300);
        //this.inputMessage.setFocus();
      }
    }, 50);

  }

}
