package cfe.cfeencuesta.classes;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;
import java.io.ByteArrayOutputStream;
import java.io.File;
import cfe.cfeencuesta.MenuActivity;
public class ImageHandler {
    static public String getBase64ImageByName(String filepath,String  filename)
    {
        Bitmap myBitmap ;
        String path = filepath + "/" +filename;
        try {
            File imgFile = new  File(path);
            if(imgFile.exists()){
                myBitmap = BitmapFactory.decodeFile(imgFile.getAbsolutePath());
                Bitmap immagex= myBitmap;
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                immagex.compress(Bitmap.CompressFormat.JPEG, 100, baos);
                byte[] b = baos.toByteArray();
                String imageEncoded = Base64.encodeToString(b,Base64.NO_WRAP);
                Log.e("tag" + "----CROP_FROM_CAMERA imageEncoded-------", ""+imageEncoded);
               // Log.d("image","esta imagen tiene" + myBitmap.getWidth() + "de alto y " + myBitmap.getHeight() +"de alto");
                return imageEncoded;
            //    Toast.makeText(this, myBitmap.getWidth()+"  " + myBitmap.getHeight(), Toast.LENGTH_SHORT).show();
            };
        }
        catch (Exception exception)
        {
            exception.printStackTrace();
        }
        return null;
    }

}
