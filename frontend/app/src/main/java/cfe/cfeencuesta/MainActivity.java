package cfe.cfeencuesta;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import com.blogspot.atifsoftwares.animatoolib.Animatoo;
import com.google.gson.Gson;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import cfe.cfeencuesta.DB.SqliteHandler;
import cfe.cfeencuesta.Environment.Environment;
import cfe.cfeencuesta.classes.UserData;
import es.dmoral.toasty.Toasty;
/**
 * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
 * @version     0.2                 (current version number of program)
 * @since       0.1          (the version of the package this class was first added to)
 * @literal esta clase nos ayuda a controlar el Main activity el cual consiste en poder darle un id
 * fijado por una expresion regular para que este sea la clave y ademas de ir preparando los datos
 * con ayuda de la clase UserData y tambien utilizamos la libreria GSON para poder serializar la clase UserData
 * y poder pasar informacion a atraves de distintas activitis.
 * @see Gson
 * @see UserData
 */
public class MainActivity extends AppCompatActivity {
    Pattern pattern ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //Toast.makeText(this, , Toast.LENGTH_SHORT).show();
       // Toast.makeText(this, getIntent().getExtras().getString(UserData.DATABUNDLE), Toast.LENGTH_SHORT).show();
        setContentView(R.layout.activity_main);
        pattern = Pattern.compile(Environment.REGEX_ENCUESTA);
    }

    /**
     * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
     * @version     0.2                 (current version number of program)
     * @since       0.1          (the version of the package this class was first added to)
     * @literal vamos a estar pasando datos a la base de datos en sqlite  por lo que lo serializaremos
     * con gson para pasarlo a traves de un bundle y que el siguiente activity tenga manera de conservar la
     * informacion
     * @see Gson
     * @see UserData
     */
    public void onClickbtnRegistrar(View view) {

        EditText editTextnorden = findViewById(R.id.editTextnorden);
        Matcher matcher = pattern.matcher(editTextnorden.getText());
        if(matcher.find())
        {
            SqliteHandler sqliteHandler = new SqliteHandler(this,SqliteHandler.SQLITE_DATABASE_NAME);
            Intent mainIntent = new Intent(MainActivity.this, QuestionActivity.class);
            Gson gson = new Gson();
            UserData userData =  gson.fromJson(getIntent().getExtras().getString(UserData.DATABUNDLE),UserData.class);
            userData.setNumeroId(editTextnorden.getText().toString());
            //userData.setCuestionarioId();
            // sqliteHandler.RegistraUsuario("hola",editTextnorden.getText().toString());
            mainIntent.putExtra(UserData.DATABUNDLE, gson.toJson(userData));
            startActivity(mainIntent);
            finish();
        }
        else
        {
            Toasty.error(this,"Ingresa un numero de orden valido",Toasty.LENGTH_LONG,true).show();
        }
    }
}
