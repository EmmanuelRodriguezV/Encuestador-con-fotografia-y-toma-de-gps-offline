package cfe.cfeencuesta;
import android.Manifest;
import android.app.DownloadManager;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import com.airbnb.lottie.animation.content.Content;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.blogspot.atifsoftwares.animatoolib.Animatoo;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.Map;

import cfe.cfeencuesta.DB.SqliteHandler;
import cfe.cfeencuesta.Environment.Environment;
import cfe.cfeencuesta.classes.ImageHandler;
import cn.pedant.SweetAlert.SweetAlertDialog;
import es.dmoral.toasty.Toasty;
/**
 * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
 * @version     0.2                 (current version number of program)
 * @since       0.1          (the version of the package this class was first added to)
 * @literal menu activity nos sirve para poder establecer y verificar los permisos necesarios para poder utilizar
 * tanto el gps como la camara  esto pasa a nivel del metodo on create
 * @see
 */
public class MenuActivity extends AppCompatActivity {
    Context context;

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = this;
        setContentView(R.layout.menulayout);
        TextView textView_num_encuestas = findViewById(R.id.textViewCountEncuestas);
        SqliteHandler sqliteHandler = new SqliteHandler(this,SqliteHandler.SQLITE_DATABASE_NAME);
        textView_num_encuestas.setText(sqliteHandler.countEncuestasRealizadas()+ "");
        Log.d("fotos", "onCreate: ");




        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED)
        {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            final String[] permisos = {Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION,Manifest.permission.WRITE_EXTERNAL_STORAGE,Manifest.permission.CAMERA};
            new SweetAlertDialog(this, SweetAlertDialog.WARNING_TYPE)
                    .setTitleText("Permisos no encontrados")
                    .setContentText("Se necesita otorgar permisos a la app \n para poder funcionar correctamente")
                    .setConfirmText("dar permisos")
                    .setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                        @Override
                        public void onClick(SweetAlertDialog sDialog) {
                            sDialog.dismissWithAnimation();
                            ActivityCompat.requestPermissions(MenuActivity.this, permisos, Environment.PERMISSION_RESULT_REQUEST_CODE);
                        }
                    })
                    .show();
            return;
        } else {




        }


    }
    public void onClickMostrarEncuestas(View view) {

        Intent intent = new Intent( MenuActivity.this,SeleccionaEncuestaActivity.class);
        MenuActivity.this.startActivity(intent);
        Animatoo.animateZoom(MenuActivity.this);

    }

    /**
     * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
     * @version     0.2                 (current version number of program)
     * @since       0.1          (the version of the package this class was first added to)
     * @literal metodo que nos regresa si el dispositivo cuenta con conectividad en linea para poder
     * manejar la comunicacion con el servidor
     * @see NetworkInfo
     * @see
     */
    boolean hay_conexion()
    {
        try {
            ConnectivityManager manager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = null;
            if (manager != null)
            {
                networkInfo = manager.getActiveNetworkInfo();
            }
            return networkInfo != null && networkInfo.isConnected();
        }
        catch (NullPointerException ex)
        {
            return  false;
        }
    }
    public void onClickbtnDescargar(View view) {
/*evento click para syncronizar con el servidor*/

        if(hay_conexion()) {
            SweetAlertDialog sweetAlertDialog = new SweetAlertDialog(context, SweetAlertDialog.PROGRESS_TYPE);
            sweetAlertDialog.setTitleText("Realizando sincronizacion con el servidor");
            sweetAlertDialog.show();
            //   Toast.makeText(context,  getPreguntas(this,sweetAlertDialog).toString(), Toast.LENGTH_SHORT).show();
            try {
               sendRespuestas(this, sweetAlertDialog);
               sendPhotos(this,sweetAlertDialog);
            } catch (JSONException jsonexc) {
                Toast.makeText(context, jsonexc.getMessage(), Toast.LENGTH_SHORT).show();
            }
            try {
                 getPreguntas(this, sweetAlertDialog);

            } catch (Exception normal_exc) {
                Toast.makeText(context, normal_exc.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }
        else {
            Toasty.error(this,"No hay conexion conexion con el servidor",Toasty.LENGTH_LONG,true).show();
        }
    }
    void sendPhotos(final Context context,final  SweetAlertDialog sweetAlertDialog) throws JSONException
    {
        SqliteHandler sqliteHandler  = new SqliteHandler(context,SqliteHandler.SQLITE_DATABASE_NAME);
        Map<String,String> encuesta_fotos =  sqliteHandler.getIdandImage();
        String base64image = "";
        for(Map.Entry<String,String> entry : encuesta_fotos.entrySet())
        {
           base64image =  ImageHandler.getBase64ImageByName(context.getFilesDir().toString(),entry.getValue());
            volleySendBase64IdImage(base64image,entry.getValue(),entry.getKey(),context);
        //    Log.d("fotosdisponibles", "sendPhotos: key " + entry.getKey() + "value :" + entry.getValue());
        }
        sqliteHandler.deleteAllfotos();



// go to your directory
//check if dir is not null
        if (getFilesDir() != null) {

            // so we can list all files
            File[] filenames = getFilesDir().listFiles();

            // loop through each file and delete
            for (File tmpf : filenames) {
                tmpf.delete();
            }
        }
    }
    void volleySendBase64IdImage(String base64img, String filename, String id_encuesta , final Context context) throws JSONException
    {
        final SqliteHandler sqliteHandler = new SqliteHandler(context, SqliteHandler.SQLITE_DATABASE_NAME);
        JSONObject senddata_parameters = new JSONObject();
        senddata_parameters.put("FILENAME",filename);
        senddata_parameters.put("ENCUESTAID",id_encuesta);
        senddata_parameters.put("BASE64IMG",base64img);
        Log.d("IMAGENAMES",filename);

        Log.d("JSON_ENVIADO", senddata_parameters.toString());
        String url = "http://"+Environment.IP_SERVIDOR_PRINCIPAL+Environment.PUERTO_OPCIONAL+Environment.RUTA_GUARDAR_FOTOS;
        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, url, senddata_parameters, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                //TODO: handle success
                //   Toast.makeText(context, response.toString(), Toast.LENGTH_LONG).show();
                Log.d("SERVIDOR_RESPUESTA_ALMACENA", response.toString());
               // Toast.makeText(context, response.toString(), Toast.LENGTH_LONG).show();
                //sweetAlertDialog.dismissWithAnimation();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
                Log.d("SERVIDOR_RESPUESTA_ALMACENA", error.toString());
              //  Toast.makeText(context, error.getMessage(), Toast.LENGTH_LONG).show();

                // Toast.makeText(context, error.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
            }
        });
        Volley.newRequestQueue(this).add(jsonRequest);
    }
    /*Metodo para registrar los nuevos usuarios y las respuestas a utilizar con la api del servidor*/
    void sendRespuestas(final Context context , final SweetAlertDialog sweetAlertDialog) throws JSONException {
        final SqliteHandler sqliteHandler = new SqliteHandler(context, SqliteHandler.SQLITE_DATABASE_NAME);
        JSONArray encuestas_realizadas = sqliteHandler.getAllEncuestasRealizadas();
        JSONArray respuestas_realizadas = sqliteHandler.getAllRespuestasRealizadas();
        JSONObject senddata_parameters = new JSONObject();
        senddata_parameters.put("ENCUESTAS_USUARIOS",encuestas_realizadas);
        senddata_parameters.put("RESPUESTAS",respuestas_realizadas);
        Log.d("JSON_ENVIADO", "sendRespuestas: " + senddata_parameters.toString());
        String url = "http://"+Environment.IP_SERVIDOR_PRINCIPAL+Environment.PUERTO_OPCIONAL+Environment.RUTA_ALMACENAR_ENCUESTAS_REALIZADAS;
        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, url, senddata_parameters, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                //TODO: handle success
             //   Toast.makeText(context, response.toString(), Toast.LENGTH_LONG).show();
                Log.d("SERVIDOR_RESPUESTA_ALMACENA", response.toString());
                //sweetAlertDialog.dismissWithAnimation();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
                Log.d("SERVIDOR_RESPUESTA_ALMACENA", error.toString());
               // Toast.makeText(context, error.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
            }
        });
        Volley.newRequestQueue(this).add(jsonRequest);
    }
    /*
    * Metodo que borra los datos de sqlite y obtiene los registros desde la api
    * */
    JSONObject  getPreguntas (final Context context , final SweetAlertDialog sweetAlertDialog )
    {
        final SqliteHandler sqliteHandler = new SqliteHandler(this,SqliteHandler.SQLITE_DATABASE_NAME);
        sqliteHandler.deleteAlldata();
        RequestQueue queue = Volley.newRequestQueue(context);
        String url ="http://"+ Environment.IP_SERVIDOR_PRINCIPAL +Environment.PUERTO_OPCIONAL+Environment.RUTA_OBTENER_ENCUESTAS_DISPONIBLES;
        final JSONObject[] jsonObject = {new JSONObject()};
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            jsonObject[0] = new JSONObject(response);
                            Log.d("serv_resp", "onResponse: "+response);
                            JSONArray jsonArray = jsonObject[0].getJSONArray("datos");
                           // Toast.makeText(context, jsonObject[0].getJSONArray("datos").toString() + "", Toast.LENGTH_SHORT).show();
                            for(int i = 0 ; i< jsonArray.length(); i++)
                            {
                                sqliteHandler.registra_encuesta((JSONObject) jsonArray.get(i));
                              //  sqliteHandler.registrarEncuesta((JSONObject) jsonArray.get(i));
                            }

                            Handler handler=new Handler();
                            Runnable r=new Runnable() {
                                public void run() {
                                    TextView textView = findViewById(R.id.textViewCountEncuestas);
                                    SqliteHandler sqliteHandler = new SqliteHandler(context,SqliteHandler.SQLITE_DATABASE_NAME);
                                    textView.setText(sqliteHandler.countEncuestasRealizadas() + "");
                                    sweetAlertDialog.dismissWithAnimation();
                                    Toasty.success(context,"Sincronizacion realizada correctamente",Toasty.LENGTH_LONG,true).show();
                                    //what ever you do here will be done after 3 seconds delay.
                                }
                            };
                            handler.postDelayed(r, Environment.SYNC_TIME);
                         //   JSONArray array = new JSONArray(jsonObject[0].getJSONArray("datos"))
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        try {
                            Log.d("encuestas", sqliteHandler.mostrarEncuestas().toString());
                         //   Log.d("encuestas", sqliteHandler.mostrarPreguntas("15130742").toString());
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("error_conexion", "onErrorResponse: "+error.getMessage());
              Toasty.error(context,"Error al realizar la sincronizacion"+ error.getMessage(),Toasty.LENGTH_LONG).show();
            }
        });
        queue.add(stringRequest);
        return jsonObject[0];
    }
    public void onClickbtnTestDB(View view) {
        SqliteHandler sqliteHandler = new SqliteHandler(this,SqliteHandler.SQLITE_DATABASE_NAME);
    }
}