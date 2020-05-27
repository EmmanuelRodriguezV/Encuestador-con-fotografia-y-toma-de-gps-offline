package cfe.cfeencuesta;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.Menu;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.blogspot.atifsoftwares.animatoolib.Animatoo;
import com.google.gson.Gson;

import cfe.cfeencuesta.Environment.Environment;
import cfe.cfeencuesta.classes.UserData;

/**
 * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
 * @version     0.2                 (current version number of program)
 * @since       0.1          (the version of the package this class was first added to)
 * @literal clase splash que nos ayuda a poder darle una mejor presentacion a la aplicacion
 */

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splashscreen);
        final Context context = this.getBaseContext();
        new Handler().postDelayed(new Runnable(){
            @Override
            public void run() {
                Intent mainIntent = new Intent(SplashActivity.this, MenuActivity.class);
                SplashActivity.this.startActivity(mainIntent);
                Animatoo.animateZoom(SplashActivity.this);
                SplashActivity.this.finish();
            }
        }, Environment.SPLASH_SCREEN_TIME);
    }
}
