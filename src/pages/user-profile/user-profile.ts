import { UserService } from './../../providers/user/user.service';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthService, public userService: UserService) {
    console.log('constructor UserProfilePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');

  }

  ionViewDidEnter() {
    this.userService.mapObjectKey(this.userService.userAtivo).first().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  onSubmit() {
    this.editUser();
  }

  private editUser(photoUrl?: string) {
    this.userService
      .edit({
        name: this.currentUser.name,
        username: this.currentUser.username,
        photo: photoUrl || this.currentUser.photo
      }).then(() => { this.canEdit = false; })
  }


  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }
}
