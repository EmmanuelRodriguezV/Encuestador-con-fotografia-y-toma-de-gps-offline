package cfe.cfeencuesta.Environment;

import com.google.gson.Gson;

import cfe.cfeencuesta.classes.UserData;

/**
 * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
 * @version     0.2                 (current version number of program)
 * @since       0.1          (the version of the package this class was first added to)
 * @literal Clase que nos permite gestionar toda la configuracion principal de la aplicacion
 * tenemos las rutas del backend,la direccion ip,y el puerto como tambien la expresion regular que se usa
 * para poder aceptar que patron se toma como valido para ingresar una orden
 */
public class Environment {
  //  public  static  String IP_SERVIDOR_PRINCIPAL = "10.14.1.93";
    //emmanuel
    public static String IP_SERVIDOR_PRINCIPAL = "192.168.0.17";
    public  static String PUERTO_OPCIONAL = ":8080";
    public  static String RUTA_GUARDAR_FOTOS = "/cfeencuesta/index.php/savepicture";
    public static String RUTA_OBTENER_ENCUESTAS_DISPONIBLES ="/cfeencuesta/index.php/sinc_encuestas";
    public  static String RUTA_ALMACENAR_ENCUESTAS_REALIZADAS = "/cfeencuesta/index.php/alm_res_encuesta";
    public static  int SPLASH_SCREEN_TIME = 3000;//3 segundos para el splash screen
    public static int SYNC_TIME = 2000 ;//tiempo al realizar la sincronizacion
    public static String REGEX_ENCUESTA = "^[A-Z]([0-9]{10})$";
    public static int PERMISSION_RESULT_REQUEST_CODE = 300;
}