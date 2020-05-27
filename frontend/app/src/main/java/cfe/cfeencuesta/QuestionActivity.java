package cfe.cfeencuesta;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import com.airbnb.lottie.LottieAnimationView;
import com.blogspot.atifsoftwares.animatoolib.Animatoo;
import com.google.gson.Gson;

import cfe.cfeencuesta.classes.UserData;
import es.dmoral.toasty.Toasty;
/**
 * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
 * @version     0.2                 (current version number of program)
 * @since       0.1          (the version of the package this class was first added to)
 * @literal La clase QuestionActivity nos sirve para poder gestionar las preguntas de las encuestas que se encontraban disponibles
 * la manera de funcionar esto es que si hay mas preguntas por responder el activity se llamara a si mismo de manera recursiva
 * todo esto hasta terminar el numero de preguntas en la encuesta y al final llamar al success activity
 * @see Gson
 * @see UserData
 * @see LottieAnimationView
 * @see Animatoo
 */
public class QuestionActivity extends AppCompatActivity {
    boolean [] estados = {false,false,false,false,false};
    String [] files = {"angry.json","sad.json","meh.json","haha.json","love.json"};
    TextView textViewPregunta;
    LottieAnimationView lottieAnimationViewrespuesta;
    UserData userData;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
     //   Toast.makeText(this, getIntent().getExtras().getString(UserData.DATABUNDLE), Toast.LENGTH_LONG).show();
        Log.d("agrupador", getIntent().getExtras().getString(UserData.DATABUNDLE));
        Gson gson = new Gson();
         userData = gson.fromJson(getIntent().getExtras().getString(UserData.DATABUNDLE),UserData.class);
         Log.d("current_pregunta",userData.getCurrent_pregunta() +"");
        setContentView(R.layout.questionlayout);
        lottieAnimationViewrespuesta = (LottieAnimationView) findViewById(R.id.lottierespuesta);
        textViewPregunta = findViewById(R.id.textViewPregunta);
        textViewPregunta.setText(userData.getPreguntas()[userData.getCurrent_pregunta()]);
    }
    public void onClickEmoji(View view) {
        LottieAnimationView lottieAnimationView = (LottieAnimationView) findViewById(view.getId());
        quitaranterior(view);
        switch (view.getId()){

            case R.id.lottieAnimationViewangry:
                estados [0] = true;
                lottieAnimationViewrespuesta.setAnimation("love.json");
                lottieAnimationViewrespuesta.playAnimation();

                break;
            case R.id.lottieAnimationViewsad:
                estados [1] = true;
                lottieAnimationViewrespuesta.setAnimation("haha.json");
                lottieAnimationViewrespuesta.playAnimation();
                break;
            case R.id.lottieAnimationViewmeh:
                estados [2] = true;
                lottieAnimationViewrespuesta.setAnimation("meh.json");
                lottieAnimationViewrespuesta.playAnimation();
                break;
            case R.id.lottieAnimationViewhaha:
                estados [3] = true;
                lottieAnimationViewrespuesta.setAnimation("sad.json");
                lottieAnimationViewrespuesta.playAnimation();
                break;
            case R.id.lottieAnimationViewlove:
                estados [4] = true;
                lottieAnimationViewrespuesta.setAnimation("angry.json");
                lottieAnimationViewrespuesta.playAnimation();
                break;
        }
       // Toast.makeText(this, lottieAnimationView.getImageAssetsFolder(), Toast.LENGTH_SHORT).show();
        lottieAnimationView.setAnimation("sevebien.json");
        lottieAnimationView.playAnimation();
        lottieAnimationView.setRepeatCount(0);
    }
    void quitaranterior(View view)
    {
        /*angry,sad,meh,haha,love*/
        LottieAnimationView lottieAnimationViewdummy;
        for(int i =0 ; i< estados.length;i++)
        {
            if(estados[i]){
                estados[i] = false;
                switch (i){
                    case 0:
                        lottieAnimationViewdummy = (LottieAnimationView)findViewById(R.id.lottieAnimationViewangry);
                        lottieAnimationViewdummy.setAnimation("love.json");
                        lottieAnimationViewdummy.playAnimation();
                        break;
                    case 1:
                        lottieAnimationViewdummy = (LottieAnimationView)findViewById(R.id.lottieAnimationViewsad);
                        lottieAnimationViewdummy.setAnimation("haha.json");
                        lottieAnimationViewdummy.playAnimation();
                        break;
                    case 2:
                        lottieAnimationViewdummy = (LottieAnimationView)findViewById(R.id.lottieAnimationViewmeh);
                        lottieAnimationViewdummy.setAnimation("meh.json");
                        lottieAnimationViewdummy.playAnimation();
                        break;
                    case 3:
                        lottieAnimationViewdummy = (LottieAnimationView)findViewById(R.id.lottieAnimationViewhaha);
                        lottieAnimationViewdummy.setAnimation("sad.json");
                        lottieAnimationViewdummy.playAnimation();
                        break;
                    case 4:
                        lottieAnimationViewdummy = (LottieAnimationView)findViewById(R.id.lottieAnimationViewlove);
                        lottieAnimationViewdummy.setAnimation("angry.json");
                        lottieAnimationViewdummy.playAnimation();
                        break;
                }
            }
        }
    }
boolean respondio()
{
    for (boolean respuesta : estados)
    {
        if(respuesta)
        {
            return true;
        }
    }
    return false;
}
int getindexRespuesta()
{
    int  indice = 0;
    for (boolean respuesta : estados)
    {
        if(respuesta)
        return indice + 1;
        indice ++;
    }
    //dummy response
    return -1;
}
    public void btnSiguienteRecursivo(View view) {
        if(respondio())
        {
           String [] respuestas = userData.getRespuestas();
           respuestas [userData.getCurrent_pregunta()] = getindexRespuesta()+"";
           userData.setRespuestas(respuestas);
            userData.setCurrent_pregunta(userData.getCurrent_pregunta()+1);
            if(userData.getCurrent_pregunta() < userData.getPreguntas().length) {
                Intent intent = getIntent(); //Get current activity
                Gson gson = new Gson();
                intent.putExtra(UserData.DATABUNDLE,gson.toJson(userData));
                finish(); //Close current activity
                Animatoo.animateSlideLeft(this);
                startActivity(intent); //Restart current activity
            }
            else
            {
                Intent intent = new Intent(QuestionActivity.this,SucessActivity.class);
                Gson gson = new Gson();
                intent.putExtra(UserData.DATABUNDLE,gson.toJson(userData));
                startActivity(intent);
                Animatoo.animateZoom(this);
                finish();
            }
        }
        else
        {
            Toasty.info(this,R.string.sin_respuesta,Toasty.LENGTH_SHORT).show();
        }

    }
}
