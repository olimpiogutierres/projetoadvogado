import { ChatPageModule } from './../pages/chat/chat.module';
import { PipesModule } from './../pipes/pipes.module';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header';
import { ComponentsModule } from './../components/components.module';
import { SigninPageModule } from './../pages/signin/signin.module';
import { AuthService } from './../providers/auth/auth.service';


import { UserService } from './../providers/user/user.service';
import { SignupPageModule } from './../pages/signup/signup.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { HttpClientModule } from '@angular/common/http'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BaseComponent } from '../components/base/base.component';



const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDxXarH2mUPXXHXiCpWEx_JAH6tTVxU_zk",
  authDomain: "ionic2-firebase-chat-c98bd.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-c98bd.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-c98bd.appspot.com",
  messagingSenderId: "1047752270485"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    SignupPageModule,
    SigninPageModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ComponentsModule,
    PipesModule,
    ChatPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    AuthService
  ]
})
export class AppModule { }
