import { NgModule } from '@angular/core';

import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';
import { MessageBoxComponent } from './message-box/message-box';

@NgModule({
	declarations: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent],
	imports: [ BrowserModule,
		IonicModule.forRoot(MyApp)],
	exports: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent]
})
export class ComponentsModule {}
