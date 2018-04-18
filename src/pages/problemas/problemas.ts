import { ProblemasCadastroPage } from './../problemas-cadastro/problemas-cadastro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProblemasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problemas',
  templateUrl: 'problemas.html',
})
export class ProblemasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProblemasPage');
  }

  onCadastroProblemas(){
    this.navCtrl.push(ProblemasCadastroPage);
  }

}
