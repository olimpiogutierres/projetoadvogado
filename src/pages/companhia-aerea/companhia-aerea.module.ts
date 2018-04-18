import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanhiaAereaPage } from './companhia-aerea';

@NgModule({
  declarations: [
    CompanhiaAereaPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanhiaAereaPage),
  ],
})
export class CompanhiaAereaPageModule {}
