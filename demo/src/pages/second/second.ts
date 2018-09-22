import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
/**
 * Generated class for the SecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-second',
  templateUrl: 'second.html',
})
export class SecondPage {

 constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {
  }

  goBack() {
    if (this.navCtrl.canGoBack()) {
      let options: NativeTransitionOptions = {
        duration: 100,
      };

      this.nativePageTransitions.fade(options);
      this.navCtrl.pop();
    } else {
      let options: NativeTransitionOptions = {
        duration: 100
      };
      this.nativePageTransitions.fade(options);
      this.navCtrl.setRoot('HomePage');
    }
  }

  ionViewDidLoad() {
-    console.log('ionViewDidLoad SecondPage');
    }
}
