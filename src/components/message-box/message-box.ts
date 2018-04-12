import { Message } from './../../models/message.model';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'message-box',
  templateUrl: 'message-box.html',
  host:{
    '[style.justify-content]':'((!isFromSender) ? "flex-start" : "flex-end")',
    '[style.text-align]':'((!isFromSender) ? "left" : "right")'
  }
})
export class MessageBoxComponent {

  @Input() message: Message;
  @Input() isFromSender: boolean;

  constructor() {
    console.log('Hello MessageBoxComponent Component');
  }


  date:Date;
  
  get Anotherdate(){  //getter function
    return this.date
  }
  setDate(date) {
    this.Anotherdate = date;
    return this.Anotherdate;
  }
  set Anotherdate(date){     // Setter Function
    this.date = new Date(date)
  }
}
