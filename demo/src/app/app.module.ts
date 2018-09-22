import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Autostart } from '@ionic-native/autostart';
import { Keyboard } from '@ionic-native/keyboard';

import { File } from '@ionic-native/file'
import { Printer} from '@ionic-native/printer';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
@NgModule({
  declarations: [
    MyApp
  //  HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Autostart,
    Keyboard,
    File,
    Printer,
    AndroidPermissions,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
