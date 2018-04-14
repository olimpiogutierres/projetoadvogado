import { AuthService } from './../providers/auth/auth.service';
import { UserService } from './../providers/user/user.service';
//import { HomePage } from './../pages/home/home';

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SigninPage } from '../pages/signin/signin';
import { User } from '../models/user.model';

// import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SigninPage;
  currentUser: User;

  constructor(authService: AuthService, userService: UserService,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {


    if (authService.auth.authState) {

      authService.auth.authState.subscribe((us: any) => {

        console.log('userService.userAtivo.valueChanges()', userService.userAtivo.valueChanges());

        userService.mapObjectKey<User>(userService.userAtivo)
          .subscribe((user: User) => {
            this.currentUser = user;
            console.log('this.currentUser.appcompo', this.currentUser);
          });
      });
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();




    });


  }
}

