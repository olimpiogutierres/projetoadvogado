import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation. 
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder, public auth: AuthService) {
    let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required]]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSubmit() {

    let loading: Loading = this.showLoading();
    this.auth.signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {
        this.navCtrl.push(HomePage);
        loading.dismiss();
      })
      .catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });
  }


  onSignup() {
    this.navCtrl.push(SignupPage);
  }


  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading; 
  }


  private showAlert(message: string) {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

  onHomePage() {

    console.log('onHomePage enter;');
    this.navCtrl.push(HomePage)
      .then((hasAccess)=>{
        console.log('Autorizado: ', hasAccess);
      }).catch(err=>{
        console.log('Não autorizado: ');
      });
      console.log('onHomePage end;');
  }

  onLogout(){
    this.auth.logout();
  }
}
