import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
 * Generated class for the ProblemasCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problemas-cadastro',
  templateUrl: 'problemas-cadastro.html',
})
export class ProblemasCadastroPage {

  problemasCadastroForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.problemasCadastroForm = this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProblemasCadastroPage');
  }

  onSubmit() {
  }
}
