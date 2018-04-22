import { UserProfilePage } from './../../pages/user-profile/user-profile';

import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { ProblemasPage } from '../../pages/problemas/problemas';

/**
 * Generated class for the UserMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User; 

  constructor(public alertCtrl: AlertController, public auth: AuthService, public app: App,
    public menuCtrl: MenuController) {
    super(alertCtrl, auth, app, menuCtrl);
    console.log('Hello UserMenuComponent Component');

  }

  onProfile(){
    console.log('onProfile');
    this.navCtrl.push(UserProfilePage); 
  }

  onProblemas(){
    this.navCtrl.setRoot(ProblemasPage);
  }

}
