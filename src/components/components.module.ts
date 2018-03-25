import { NgModule } from '@angular/core';

import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';

@NgModule({
	declarations: [
    CustomLoggedHeaderComponent],
	imports: [ BrowserModule,
		IonicModule.forRoot(MyApp)],
	exports: [
    CustomLoggedHeaderComponent]
})
export class ComponentsModule {}
