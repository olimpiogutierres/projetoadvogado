import { SigninPage } from './../../pages/signin/signin';
import { AlertController, App, MenuController, NavController } from 'ionic-angular';
import { OnInit } from "@angular/core";
import { AuthService } from '../../providers/auth/auth.service';

export abstract class BaseComponent implements OnInit{

  protected navCtrl: NavController
  
  title: string;

  constructor(public alertCtrl:AlertController, public auth: AuthService, public app: App, 
    public menuCtrl: MenuController) {
    
  }

  ngOnInit(): void {
    this.navCtrl = this.app.getActiveNav();
  }

  onLogout(){
    this.alertCtrl.create({
      message: 'Você deseja sair?',
      buttons: [
        {
          text: 'Sim',
          handler:()=>{
            this.auth.logout()
              .then(()=>{
                this.navCtrl.setRoot(SigninPage);
                this.menuCtrl.enable(false,'user-menu');
              });
          }
        },
        {
          text: 'Não'
        }
      ]
    }).present();
  }

}
