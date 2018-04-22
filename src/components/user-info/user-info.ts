import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

/**
 * Generated class for the UserInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent {

  @Input() user: User;
  @Input() isMenu: boolean = false;

  constructor() {
    console.log('Hello UserInfoComponent Component');

    console.log('Userinfo.constructor',this.user);

  }

  ionViewDidEnter(){
   console.log(this.user);
  }

}
