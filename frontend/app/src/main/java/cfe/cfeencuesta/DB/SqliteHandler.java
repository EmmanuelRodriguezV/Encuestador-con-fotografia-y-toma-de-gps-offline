package cfe.cfeencuesta.DB;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseErrorHandler;
import android.database.DatabaseUtils;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;
import androidx.annotation.Nullable;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import cfe.cfeencuesta.classes.UserData;
/**
 * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
 * @version     0.2                 (current version number of program)
 * @since       0.1          (the version of the package this class was first added to)
 * @literal esta clase nos permite poder utilizar la conexion con la base de datos de sqlite
 * la ruta en donde esto se guarda es en el almacenamiento interno en /data/data/cfe.cfeencuesta
 */
public class SqliteHandler extends SQLiteOpenHelper {
    private static final int CONVERT_TIME_MILSENCONDS_TO_SECONDS = 1000;
    public static String SQLITE_DATABASE_NAME = "DB_CFE_ENCUESTATest3";

    public SqliteHandler(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }

    public SqliteHandler(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version, @Nullable DatabaseErrorHandler errorHandler) {
        super(context, name, factory, version, errorHandler);
    }

    public SqliteHandler(Context context, String databasename) {
        super(context, databasename, null, 1);
    }
    @Override

    public void onCreate(SQLiteDatabase db) {
        String QUERY5 = "CREATE TABLE IF NOT EXISTS CUENTACLICKS (CLICKS INTEGER )";
        String QUERY = "CREATE TABLE  IF NOT EXISTS USUARIO (NUMEROID TEXT ,NOMBREUSUARIO TEXT,TIMESTAMP INTEGER,LATITUD REAL,LONGITUD REAL)";
        String QUERY2 = "CREATE TABLE IF NOT EXISTS RESPUESTAS(NUMEROID TEXT,IDPREGUNTA TEXT,RESPUESTA TEXT )";
        String QUERY3 = "CREATE TABLE IF NOT EXISTS ENCUESTA(IDENCUESTA TEXT,TITULO TEXT,COMMENTARIO TEXT);";
        String QUERY4 = "CREATE TABLE IF NOT EXISTS  PREGUNTAS (IDENCUESTA TEXT,IDPREGUNTA TEXT ,PREGUNTA TEXT );";
        String QUERY6 = "CREATE TABLE IF NOT EXISTS FOTOS(NUMEROID TEXT,NOMBREFOTO TEXT )";
        db.execSQL(QUERY);
        db.execSQL(QUERY2);
        db.execSQL(QUERY3);
        db.execSQL(QUERY4);
        db.execSQL(QUERY5);
        db.execSQL(QUERY6);

    }
    public  Map<String,String> getIdandImage()
    {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM FOTOS; ",null);
        Map<String,String> encuestasfotos =  new HashMap<>();
        if(c.moveToFirst())
        {
            do{
                String encuestaid = c.getString(0);
                String foto = c.getString(1);
                encuestasfotos.put(encuestaid,foto);
            }while(c.moveToNext());
        }
        c.close();
        return  encuestasfotos;
    }
    public  void  RegistrarFoto(UserData userData)
    {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("NUMEROID",userData.getNumeroId());
        contentValues.put("NOMBREFOTO",userData.getName_foto());
        db.insert("FOTOS",null,contentValues);
    }
    public boolean RegistrarUser(UserData userData) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("NUMEROID", userData.getCuestionarioId());
        contentValues.put("TIMESTAMP", System.currentTimeMillis() / CONVERT_TIME_MILSENCONDS_TO_SECONDS);
        db.insert("USUARIO", null, contentValues);
        return true;
    }


    public  int countEncuestasRealizadas(){
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor= db.rawQuery("SELECT COUNT (*) FROM USUARIO ",null);
        cursor.moveToFirst();
        int num_encuestas_realizadas= cursor.getInt(0);
        cursor.close();
        Log.d("numencuestas", "countEncuestasRealizadas: " + num_encuestas_realizadas);
        return num_encuestas_realizadas;
        /*String  Query = "SELECT * FROM  USUARIO;";
        Cursor cursor = db.rawQuery(Query,null);
        int num_encuestas_realizadas = (int) DatabaseUtils.queryNumEntries(db,"USUARIO");*/
        //while (cursor.moveToNext())
          //  num_encuestas_realizadas ++;
        /*
        if (cursor.moveToNext())
        { num_encuestas_realizadas++;
            do {
            num_encuestas_realizadas++;

            }while (cursor.moveToNext());
        }*/

        //return num_encuestas_realizadas;
    }
    public boolean RegistraUsuario(String numeroid, String nombre) throws SQLException {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        UUID uuid = UUID.randomUUID();
        contentValues.put("NUMEROID", uuid.toString());
        contentValues.put("NOMBREUSUARIO", nombre);
        contentValues.put("TIMESTAMP", System.currentTimeMillis() / CONVERT_TIME_MILSENCONDS_TO_SECONDS);
        db.insert("USUARIO", nombre, contentValues);
        db.close();
        return true;
    }
    public void registra_encuesta(JSONObject encuestajson) throws JSONException {
        String spr_id = encuestajson.getString("spr_id");
        String spr_pregunta = encuestajson.getString("spr_pregunta");
        String senc_id = encuestajson.getString("senc_id");
        String senc_descripcion = encuestajson.getString("senc_descripcion");
        Log.d("entrada_registra", spr_id + spr_pregunta + senc_id +senc_descripcion);
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentEncuesta = new ContentValues();
        ContentValues contentPregunta = new ContentValues();
        /*   String QUERY3 = "CREATE TABLE IF NOT EXISTS ENCUESTA(IDENCUESTA TEXT,TITULO TEXT,COMMENTARIO TEXT);";
        String QUERY4 = "CREATE TABLE IF NOT EXISTS  PREGUNTAS (IDENCUESTA TEXT,IDPREGUNTA TEXT ,PREGUNTA TEXT );";*/
        contentEncuesta.put("IDENCUESTA",senc_id);
        contentEncuesta.put("TITULO",senc_descripcion);
        db.insert("ENCUESTA",null,contentEncuesta);
        contentPregunta.put("IDENCUESTA",senc_id);
        contentPregunta.put("IDPREGUNTA",spr_id);
        contentPregunta.put("PREGUNTA",spr_pregunta);
        db.insert("PREGUNTAS",null,contentPregunta);
        db.close();

    }
    public String [] mostrarPreguntasbyTituloEncuesta(String Titulo)
    {
              /*
        String QUERY = "CREATE TABLE  IF NOT EXISTS USUARIO (NUMEROID TEXT PRIMARY KEY,NOMBREUSUARIO TEXT,TIMESTAMP INTEGER)";
        String QUERY2 = "CREATE TABLE IF NOT EXISTS RESPUESTAS(NUMEROID TEXT,IDPREGUNTA INTEGER,RESPUESTA INTEGER )";
        String QUERY3 = "CREATE TABLE IF NOT EXISTS ENCUESTA(IDENCUESTA TEXT,TITULO TEXT,COMMENTARIO TEXT);";
        String QUERY4 = "CREATE TABLE IF NOT EXISTS  PREGUNTAS (IDENCUESTA TEXT,IDPREGUNTA TEXT ,PREGUNTA TEXT );";
        String QUERY5 = "CREATE TABLE IF NOT EXISTS RESPUESTAS (NUMEROID TEXT,IDENCUESTA TEXT,IDPREGUNTA)";
        * */

        String [] preguntas_array ;
        SQLiteDatabase db = this.getReadableDatabase();
        String []args = {Titulo};
        Cursor c = db.rawQuery("SELECT PREGUNTA FROM PREGUNTAS WHERE IDENCUESTA = (SELECT IDENCUESTA FROM ENCUESTA WHERE TITULO = ?)",args);
        Log.d("RESULTADO", c.toString());
        preguntas_array = new String[c.getCount()];
        int i = 0;
        if(c.moveToFirst())
        {
            do{

                preguntas_array [i] = c.getString(0);

                Log.d("RESULTADO", c.getString(0));
             //   JSONObject jsonObject = new JSONObject();
              //  jsonObject.put("PREGUNTA",c.getString(2));
               // preguntas.put(jsonObject);
                i++;
            }while(c.moveToNext());
        }
        c.close();
        return  preguntas_array;

    }
    public JSONArray mostrarEncuestas() throws JSONException {

        JSONArray jsonArray = new JSONArray();
        SQLiteDatabase db = this.getReadableDatabase();
        ArrayList<String> usuarios = new ArrayList<>();
        Cursor c = db.rawQuery("SELECT DISTINCT * FROM ENCUESTA  ", null);
        if (c.moveToFirst()){
            do {
                // Passing values
                JSONObject jsonObject = new JSONObject();
                try {
                    Log.d("encuesta2",  "1" + c.getString(0));
                    Log.d("encuesta2", "2"+ c.getString(1));
                    Log.d("encuesta2", "3"+ c.getString(2));
                }
                catch (Exception ex)
                {

                }
                jsonObject.put("IDENCUESTA",c.getString(0));
               // jsonObject.put("IDPREGUNTA",c.getString(1));
                jsonObject.put("TITULO",c.getString(1));
                Log.d("finaljson", jsonObject.toString());
                jsonArray.put(jsonObject);
            } while(c.moveToNext());
        }
        c.close();
        return jsonArray;
    }

    public void deleteAlldata ()
    {
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM USUARIO");
        db.execSQL("DELETE FROM RESPUESTAS");
        db.execSQL("DELETE FROM ENCUESTA");
        db.execSQL("DELETE FROM PREGUNTAS");
        db.close();
    }
    public void deleteAllfotos()
    {
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM FOTOS");
        db.close();
    }
    public ArrayList<String> ShowUsers(){
        SQLiteDatabase db = this.getReadableDatabase();
        ArrayList<String> usuarios = new ArrayList<>();
        Cursor c = db.rawQuery("SELECT * FROM USUARIO ", null);
        if (c.moveToFirst()){
            do {
                usuarios.add(c.getString(0));
            } while(c.moveToNext());
        }
        c.close();
        return  usuarios;
    }
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

    public void saveUserData(UserData userData)
    {
    /*      String QUERY = "CREATE TABLE  IF NOT EXISTS USUARIO (NUMEROID TEXT PRIMARY KEY,NOMBREUSUARIO TEXT,TIMESTAMP INTEGER,LATITUD REAL,LONGITUD REAL)";
        String QUERY2 = "CREATE TABLE IF NOT EXISTS RESPUESTAS(NUMEROID TEXT,IDPREGUNTA INTEGER,RESPUESTA INTEGER )";
        String QUERY3 = "CREATE TABLE IF NOT EXISTS ENCUESTA(IDENCUESTA TEXT,TITULO TEXT,COMMENTARIO TEXT);";
        String QUERY4 = "CREATE TABLE IF NOT EXISTS  PREGUNTAS (IDENCUESTA TEXT,IDPREGUNTA TEXT ,PREGUNTA TEXT );";
        */
        Log.d("saveuser","holaaaa");
        Log.d("saveuser", "NumeroID " + userData.getNumeroId());
        Log.d("saveuser","CuestionarioId" + userData.getCuestionarioId());
        Log.d("saveuser","Latitud" + userData.getLat());
        Log.d("saveuser","Longitud" + userData.getLon());
        for (String cadena : userData.getPreguntas())
        {
         Log.d("saveuser","Preguntas :" + cadena);
        }
        for (String cadena : userData.getRespuestas())
        {
            Log.d("saveuser","Preguntas:" + cadena);
        }
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValuesUsuario = new ContentValues();
        ContentValues contentRespuesta  = new  ContentValues();
        //Insertando usuario
        contentValuesUsuario.put("NOMBREUSUARIO",userData.getNumeroId());
        contentValuesUsuario.put("NUMEROID",userData.getCuestionarioId());
        contentValuesUsuario.put("LATITUD",userData.getLat());
        contentValuesUsuario.put("LONGITUD",userData.getLon());
        db.insert("USUARIO",null,contentValuesUsuario);
        int i = 0;
        String [] id_preguntas = getidpreguntas(userData.getCuestionarioId());

        for(String respuesta : userData.getRespuestas()){
            contentRespuesta.put("NUMEROID",userData.getNumeroId());
            contentRespuesta.put("IDPREGUNTA",id_preguntas[i]);
            contentRespuesta.put("RESPUESTA",respuesta);
            db.insert("RESPUESTAS",null,contentRespuesta);
            i++;
            contentRespuesta.clear();
        }
        db.close();
    }

    public JSONArray showRespuestas() throws JSONException {
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject =  new JSONObject();
        SQLiteDatabase db = this.getReadableDatabase();
        String QUERY = "SELECT * FROM RESPUESTAS";
       Cursor c =   db.rawQuery(QUERY,null);
       String respuesta = "";
       if(c.moveToFirst())
       {
        do {
            jsonObject = new JSONObject();
            jsonObject.put("NUMEROID",c.getString(0));
            jsonObject.put("IDPREGUNTA",c.getString(1));
            jsonObject.put("RESPUESTA",c.getString(2));
            jsonArray.put(jsonObject);
        }while(c.moveToNext());
       }
       c.close();
       return jsonArray;
    }
    String [] getidpreguntas( String idEncuesta)
    {
        String [] idpreguntas ;
        SQLiteDatabase db = this.getReadableDatabase();
        String QUERY = "SELECT IDPREGUNTA FROM PREGUNTAS WHERE IDENCUESTA = ?";
        String [] arguments = {idEncuesta};
       Cursor c =   db.rawQuery(QUERY,arguments);
       idpreguntas = new String[c.getCount()];
       int i = 0;
        if (c.moveToFirst()){
            do {

                //usuarios.add(c.getString(0));
                idpreguntas [i] = c.getString(0);
                i++;
            } while(c.moveToNext());
        }
        c.close();
        return  idpreguntas;
    }

    public void deleteallData(){
        String QUERY = "DELETE FROM USUARIO";
        String QUERY2 = "DELETE FROM USUARIO";
        String QUERY3 = "DELETE FROM USUARIO";
        String QUERY4= "DELETE FROM USUARIO";
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL(QUERY);
        db.execSQL(QUERY2);
        db.execSQL(QUERY3);
        db.execSQL(QUERY4);
        db.close();
    }
    public String getEncuestaid(String s) {
        /*
        String QUERY = "CREATE TABLE  IF NOT EXISTS USUARIO (NUMEROID TEXT PRIMARY KEY,NOMBREUSUARIO TEXT,TIMESTAMP INTEGER,LATITUD REAL,LONGITUD REAL)";
        String QUERY2 = "CREATE TABLE IF NOT EXISTS RESPUESTAS(NUMEROID TEXT,IDPREGUNTA TEXT,RESPUESTA TEXT )";
        String QUERY3 = "CREATE TABLE IF NOT EXISTS ENCUESTA(IDENCUESTA TEXT,TITULO TEXT,COMMENTARIO TEXT);";
        String QUERY4 = "CREATE TABLE IF NOT EXISTS  PREGUNTAS (IDENCUESTA TEXT,IDPREGUNTA TEXT ,PREGUNTA TEXT );";
        * */
        SQLiteDatabase db = this.getReadableDatabase();
        String [] args = {s};
        String QUERY = "SELECT IDENCUESTA FROM ENCUESTA WHERE TITULO = ?";
        Cursor c = db.rawQuery(QUERY,args);
        if(c.moveToNext())
            return  c.getString(0);
        return  null;
    }
    public JSONArray getAllEncuestasRealizadas() throws JSONException {

        /*
        *        String QUERY = "CREATE TABLE  IF NOT EXISTS USUARIO (NUMEROID TEXT PRIMARY KEY,NOMBREUSUARIO TEXT,TIMESTAMP INTEGER,LATITUD REAL,LONGITUD REAL)";
        String QUERY2 = "CREATE TABLE IF NOT EXISTS RESPUESTAS(NUMEROID TEXT,IDPREGUNTA TEXT,RESPUESTA TEXT )";
        String QUERY3 = "CREATE TABLE IF NOT EXISTS ENCUESTA(IDENCUESTA TEXT,TITULO TEXT,COMMENTARIO TEXT);";
        String QUERY4 = "CREATE TABLE IF NOT EXISTS  PREGUNTAS (IDENCUESTA TEXT,IDPREGUNTA TEXT ,PREGUNTA TEXT );";*/
        JSONArray jsonArray = new JSONArray();
        SQLiteDatabase db = this.getReadableDatabase();
        String QUERY  = "SELECT  NUMEROID,NOMBREUSUARIO,LATITUD,LONGITUD FROM USUARIO";
        Cursor c = db.rawQuery(QUERY,null);
        JSONObject jsonObject = new JSONObject();
        if(c.moveToNext())
        {
            do {
                {
                    jsonObject = new JSONObject();
                    jsonObject.put("NUMEROID",c.getString(0));
                    jsonObject.put("NOMBREUSUARIO",c.getString(1));
                    jsonObject.put("LATITUD",c.getString(2));
                    jsonObject.put("LONGITUD",c.getString(3));
                    jsonArray.put(jsonObject);
                }
            }while (c.moveToNext());
        }
        return  jsonArray;
    }
    public  JSONArray getAllRespuestasRealizadas() throws  JSONException{
        JSONArray jsonArray = new JSONArray();
        SQLiteDatabase db = this.getReadableDatabase();
        String QUERY  = "SELECT * FROM RESPUESTAS";
        Cursor c = db.rawQuery(QUERY,null);
        JSONObject jsonObject = new JSONObject();
        if(c.moveToNext())
        {
            do {
                {
                    jsonObject = new JSONObject();
                    jsonObject.put("NUMEROID",c.getString(0));
                    jsonObject.put("IDPREGUNTA",c.getString(1));
                    jsonObject.put("RESPUESTA",c.getString(2));
                    jsonArray.put(jsonObject);
                }
            }while (c.moveToNext());
        }
        return  jsonArray;
    }
}
