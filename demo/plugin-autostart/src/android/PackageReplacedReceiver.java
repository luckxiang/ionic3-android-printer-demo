package com.tonikorin.cordova.plugin.autostart;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import com.tonikorin.cordova.plugin.autostart.AppStarter;

import android.util.Log;
public class PackageReplacedReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        Log.d("Cordova apppppp", "PackageReplacedReceiver");
        AppStarter appStarter = new AppStarter();
        appStarter.run(context, intent, AppStarter.BYPASS_USERPRESENT_MODIFICATION );
    }
}
