import { NgModule } from '@angular/core';

import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';
import { MessageBoxComponent } from './message-box/message-box';
import { UserInfoComponent } from './user-info/user-info';
import { UserMenuComponent } from './user-menu/user-menu';

@NgModule({
	declarations: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent],
	imports: [ BrowserModule,
		IonicModule.forRoot(MyApp)],
	exports: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent]
})
export class ComponentsModule {}
