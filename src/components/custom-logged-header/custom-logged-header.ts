import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AlertController, MenuController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';

/**
 * Generated class for the CustomLoggedHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input() title: string;
  @Input() name:string;

  constructor(public alertCtrl: AlertController, public auth: AuthService, public app: App,
    public menuCtrl: MenuController) {
    super(alertCtrl, auth, app, menuCtrl);
    console.log('Hello CustomLoggedHeaderComponent Component');
    this.name = auth.auth.auth.currentUser.email;
    
  }

  

}
