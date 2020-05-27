package cfe.cfeencuesta;
import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.hardware.Camera;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.blogspot.atifsoftwares.animatoolib.Animatoo;

import com.google.gson.Gson;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import cfe.cfeencuesta.DB.SqliteHandler;
import cfe.cfeencuesta.Environment.Environment;
import cfe.cfeencuesta.classes.UserData;
import cn.pedant.SweetAlert.SweetAlertDialog;
import cfe.cfeencuesta.classes.CameraPreview;
import es.dmoral.toasty.Toasty;
import mumayank.com.airlocationlibrary.AirLocation;
@SuppressLint("Registered")
/**
 * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
 * @version     0.2                 (current version number of program)
 * @since       0.1          (the version of the package this class was first added to)
 * @literal este activity es la parte que guarda toda la informacion recolectada por el activity anterior
 * toma la posicion del gps tanto este online como offline y por ultimo prepara la camara frontal utilizando la clase Camerapreview
 * @see Gson
 * @see UserData
 * @see  CameraPreview
 */
public class SucessActivity extends AppCompatActivity {
    private AirLocation airLocation;
    UserData userData;
    Context context;
    boolean registrado;
    private Camera mCamera;
    private CameraPreview mPreview;
    Camera.PictureCallback mPicture;
    SweetAlertDialog sweetAlertDialog;
    //private CameraKitView cameraKitView;
/*
    protected void onStart() {
        super.onStart();
        cameraKitView.onStart();
    }

    @Override
    protected void onResume() {
        super.onResume();
        cameraKitView.onResume();
    }

    @Override
    protected void onPause() {
        cameraKitView.onPause();
        super.onPause();
    }

    @Override
    protected void onStop() {
        cameraKitView.onStop();
        super.onStop();
    }
*/

    @Override
    protected void onStart() {
        super.onStart();

    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sucessactivity);


        mCamera = getCameraInstance();
        mCamera.setDisplayOrientation(90);
        // Create our Preview view and set it as the content of our activity.
        mPreview = new CameraPreview(SucessActivity.this,  mCamera);
        FrameLayout preview = (FrameLayout) findViewById(R.id.camera_preview);
        preview.addView(mPreview);



        final Context contexto = this;

        mPicture = new Camera.PictureCallback() {
            @Override
            public void onPictureTaken(byte[] data, Camera camera) {
                /**
                 * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
                 * @version     0.2                 (current version number of program)
                 * @since       0.2          (the version of the package this class was first added to)
                 * @literal este metodo es el callback que se llama cada vez que take picture es activado
                 * en este metodo utilizamos un sweetAlertDialog y convertimos el array de datos y parametro llamado data
                 * utilizando el metodo decodeByteArray para poderlo convertir en un bitmap valido para despues llamar al metodo
                 * storeImage
                 * @params data
                 * @params camera
                 * @see Gson
                 *
                 * @see UserData
                 */

                sweetAlertDialog = new SweetAlertDialog(context, SweetAlertDialog.PROGRESS_TYPE);
                sweetAlertDialog.setTitleText("Guardando encuesta realizada");
                sweetAlertDialog.show();


                Bitmap bmp = BitmapFactory.decodeByteArray(data, 0, data.length);
                                            Bitmap mutableBitmap = bmp.copy(Bitmap.Config.ARGB_8888, true);
                                            storeImage(mutableBitmap,userData);
                                       //     sweetAlertDialog.dismissWithAnimation();
                sweetAlertDialog.dismissWithAnimation();
                Toasty.success(SucessActivity.this,"Encuesta Guardada correctamente",Toasty.LENGTH_SHORT,true).show();
                Intent intent = new Intent(SucessActivity.this,MenuActivity.class);

                SucessActivity.this.startActivity(intent);
                Animatoo.animateFade(SucessActivity.this);
                SucessActivity.this.finish();
              //  Toast.makeText(context, "se tomo la foto", Toast.LENGTH_SHORT).show();
            }
        };



        //cameraKitView = findViewById(R.id.camera2);
        Gson gson = new Gson();
        registrado = false;
        userData = gson.fromJson(getIntent().getExtras().getString(UserData.DATABUNDLE), UserData.class);
        final SqliteHandler sqliteHandler = new SqliteHandler(SucessActivity.this, SqliteHandler.SQLITE_DATABASE_NAME);
        //sqliteHandler.RegistrarUser(userData);
        Log.d("users", "" + sqliteHandler.ShowUsers().toString());
        //  sqliteHandler.saveUserData(userData);
        context = this;
        LocationManager locationmanager = (LocationManager) getSystemService(LOCATION_SERVICE);
        // mylocation = locationmanager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
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
                            ActivityCompat.requestPermissions(SucessActivity.this, permisos, Environment.PERMISSION_RESULT_REQUEST_CODE);
                        }
                    })

                    .show();
            return;
        } else {

           sweetAlertDialog = new SweetAlertDialog(context, SweetAlertDialog.PROGRESS_TYPE);
            sweetAlertDialog.setTitleText("Registrando encuesta");
            sweetAlertDialog.show();
            locationmanager.requestLocationUpdates(
                    LocationManager.GPS_PROVIDER, 0, 0, new LocationListener() {
                        @Override
                        public void onLocationChanged(Location newlocation) {
                            // callback with the new location data
                            if (!registrado) {
                                String latitude = String.valueOf(newlocation.getLatitude());
                                String longitude = String.valueOf(newlocation.getLongitude());
                                String accuracy = String.valueOf(newlocation.getAccuracy());
                                userData.setLon(newlocation.getLongitude());
                                userData.setLat(newlocation.getLatitude());
                                sqliteHandler.saveUserData(userData);
                                //                Toast.makeText(SucessActivity.this, sqliteHandler.showRespuestas(), Toast.LENGTH_LONG).show();
                                registrado = !registrado;

                                if (ContextCompat.checkSelfPermission(SucessActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                                        != PackageManager.PERMISSION_GRANTED) {
                                    // Permission is not granted

                                    String [] Permisos = {Manifest.permission.WRITE_EXTERNAL_STORAGE};
                                    requestPermissions(Permisos,500);
                                }
                                else
                                {

                                    sweetAlertDialog.dismissWithAnimation();

                                    /*
                                    cameraKitView.captureImage(new CameraKitView.ImageCallback() {
                                        @Override
                                        public void onImage(CameraKitView cameraKitView, byte[] bytes) {

                                            //File f=new File(getFilesDir(), "foo.txt");
                                            //File file = getFilesDir();
                                            //SavePhotoTask savePhotoTask = new SavePhotoTask(file);
                                            //savePhotoTask.doInBackground(bytes);
                                            Bitmap bmp = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
                                            Bitmap mutableBitmap = bmp.copy(Bitmap.Config.ARGB_8888, true);
                                            //Toast.makeText(MainActivity.this, "ancho" + bmp.getWidth(), Toast.LENGTH_SHORT).show();
                                            // Toast.makeText(MainActivity.this, "alto" + bmp.getHeight(), Toast.LENGTH_SHORT).show();
                                            storeImage(mutableBitmap,userData);
                                            sweetAlertDialog.dismissWithAnimation();
                                        }
                                    });
                                    */
                                }
                            }
                        }

                        @Override
                        public void onStatusChanged(String provider, int status, Bundle extras) {


                        }
                        @Override
                        public void onProviderEnabled(String provider) {


                        }
                        @Override
                        public void onProviderDisabled(String provider) {

                        }
                    });
        }
    }
    private void requestPermissions(SucessActivity sucessActivity, String[] permisos, int i) {




    }
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        /**
         * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
         * @version     0.2                 (current version number of program)
         * @since       0.1          (the version of the package this class was first added to)
         * @literal Este metodo es llamado cuando pedimos los permisos en nivel de run time y que acciones se deben tomar despues
         * es un seguro por si en la parte del menu no se dieron correctamente los permisos
         * @params grantResults
         */
        switch (requestCode) {
            case 300:
                LocationManager locationmanager = (LocationManager) getSystemService(LOCATION_SERVICE);
                if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    // TODO: Consider calling
                    //    ActivityCompat#requestPermissions
                    // here to request the missing permissions, and then overriding
                    //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                    //                                          int[] grantResults)
                    // to handle the case where the user grants the permission. See the documentation
                    // for ActivityCompat#requestPermissions for more details.
                    return;
                }
                final SqliteHandler sqliteHandler = new SqliteHandler(this,SqliteHandler.SQLITE_DATABASE_NAME);
                locationmanager.requestLocationUpdates(
                        LocationManager.GPS_PROVIDER, 0, 0, new LocationListener() {
                            @Override
                            public void onLocationChanged(Location newlocation) {
                                // callback with the new location data
                                if (!registrado) {
                                    String latitude = String.valueOf(newlocation.getLatitude());
                                    String longitude = String.valueOf(newlocation.getLongitude());
                                    String accuracy = String.valueOf(newlocation.getAccuracy());
                                    userData.setLon(newlocation.getLongitude());
                                    userData.setLat(newlocation.getLatitude());
                                    sqliteHandler.saveUserData(userData);
                                    //                Toast.makeText(SucessActivity.this, sqliteHandler.showRespuestas(), Toast.LENGTH_LONG).show();
                                    registrado = !registrado;
                                }
                            }
                            @Override
                            public void onStatusChanged(String provider, int status, Bundle extras) {
                            }
                            @Override
                            public void onProviderEnabled(String provider) {
                       

                            }
                            @Override
                            public void onProviderDisabled(String provider) {


                            }
                        });
                break;
            case  500:
            {
                if (grantResults.length > 0   && grantResults[0]  == PackageManager.PERMISSION_GRANTED)
                {
                    /*
                    cameraKitView.captureImage(new CameraKitView.ImageCallback() {
                        @Override
                        public void onImage(CameraKitView cameraKitView, byte[] bytes) {
                            //            SavePhotoTask savePhotoTask = new SavePhotoTask(getFilesDir());
                            //           savePhotoTask.doInBackground(bytes);

                            Bitmap bmp = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
                            Bitmap mutableBitmap = bmp.copy(Bitmap.Config.ARGB_8888, true);
                            //Toast.makeText(MainActivity.this, "ancho" + bmp.getWidth(), Toast.LENGTH_SHORT).show();
                            // Toast.makeText(MainActivity.this, "alto" + bmp.getHeight(), Toast.LENGTH_SHORT).show();
                            storeImage(mutableBitmap,userData);
                            Toast.makeText(SucessActivity.this, "imagen guardada" , Toast.LENGTH_SHORT).show();
                        }
                    });
                    */
                    mCamera.takePicture(null, null,mPicture );


                }
                else {

                }
            }
          //  cameraKitView.onRequestPermissionsResult(requestCode, permissions, grantResults);
            break;
        }
    }
    private void storeImage(Bitmap image,UserData userData) {
        /**
         * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
         * @version     0.2                 (current version number of program)
         * @since       0.2          (the version of the package this class was first added to)
         * @literal este metodo tomara un bitmap y un userdata y creara un UUID todo esto para  darle un nombre aleatorio
         * a la foto y ademas de esto poder guardarlo internamente.
         * @params image
         * @params userData

         */
        try {
            String timeStamp = new SimpleDateFormat("ddMMyyyy_HHmm").format(new Date());

            SqliteHandler sqliteHandler = new SqliteHandler(this,SqliteHandler.SQLITE_DATABASE_NAME);

            String mImageName="MI_"+ UUID.randomUUID().toString()+ timeStamp +".jpg";
            userData.setName_foto(mImageName);
            sqliteHandler.RegistrarFoto(userData);
            FileOutputStream fos = openFileOutput(mImageName, MODE_PRIVATE);
            image.compress(Bitmap.CompressFormat.JPEG, 30, fos);
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void onClickRegresaMenu(View view) {

        /**
         * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
         * @version     0.2                 (current version number of program)
         * @since       0.2          (the version of the package this class was first added to)
         * @literal vamos a estar pasando datos a la base de datos en sqlite  por lo que lo serializaremos
         * con gson para pasarlo a traves de un bundle y que el siguiente activity tenga manera de conservar la
         * informacion

         */
        mCamera.takePicture(null, null,mPicture );


      //  Toast.makeText(context, "foto tomada", Toast.LENGTH_SHORT).show();
    }

    public  Camera getCameraInstance(){
        Camera c = null;
        try {
            c = Camera.open(1); // attempt to get a Camera instance
        }
        catch (Exception e){
            // Camera is not available (in use or does not exist)
        }
        return c; // returns null if camera is unavailable
    }

}
