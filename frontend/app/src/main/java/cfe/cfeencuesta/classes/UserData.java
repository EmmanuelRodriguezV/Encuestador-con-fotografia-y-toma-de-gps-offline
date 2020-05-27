package cfe.cfeencuesta.classes;
import android.content.Context;
import cfe.cfeencuesta.DB.SqliteHandler;
public class UserData {
    String NumeroId;
    String CuestionarioId;
    String [] preguntas ;

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public String getName_foto() {
        return name_foto;
    }

    public void setName_foto(String name_foto) {
        this.name_foto = name_foto;
    }

    String name_foto;
    Double lon,lat;
    String [] respuestas ;
    int current_pregunta;
    public UserData()
    {

        current_pregunta = 0;
    }
    public void crearRespuestas() throws  Exception {
        respuestas = new String[preguntas.length];
    }
    public UserData(String numeroId, String cuestionarioId, String[] preguntas) {
        NumeroId = numeroId;
        CuestionarioId = cuestionarioId;
        this.preguntas = preguntas;
        current_pregunta = 0;
    }
    public String getNumeroId() {
        return NumeroId;
    }

    public void setNumeroId(String numeroId) {
        NumeroId = numeroId;
    }

    public String getCuestionarioId() {
        return CuestionarioId;
    }

    public void setCuestionarioId(String cuestionarioId) {
        CuestionarioId = cuestionarioId;
    }

    public String[] getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(String[] preguntas) {
        this.preguntas = preguntas;
    }

    public String[] getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(String[] respuestas) {
        this.respuestas = respuestas;
    }

    public int getCurrent_pregunta() {
        return current_pregunta;
    }

    public void setCurrent_pregunta(int current_pregunta) {
        this.current_pregunta = current_pregunta;
    }

    public void saveUser(Context mcontext)
    {
        SqliteHandler sqliteHandler = new SqliteHandler(mcontext,SqliteHandler.SQLITE_DATABASE_NAME);
        sqliteHandler.saveUserData(this);

    }

    static public String DATABUNDLE  = "USERDATA";
}
