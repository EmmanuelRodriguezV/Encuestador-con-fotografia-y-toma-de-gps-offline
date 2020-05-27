package cfe.cfeencuesta;

import android.animation.Animator;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.airbnb.lottie.LottieAnimationView;
import com.blogspot.atifsoftwares.animatoolib.Animatoo;
import com.google.gson.Gson;
import com.rey.material.widget.Slider;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import cfe.cfeencuesta.DB.SqliteHandler;
import cfe.cfeencuesta.classes.UserData;
import es.dmoral.toasty.Toasty;

/**
 * @author     Emmanuel Rodriguez Velazquez  ema-stuff@hotmail.com
 * @version     0.2                 (current version number of program)
 * @since       0.1          (the version of the package this class was first added to)
 * @literal Esta clase nos sirve para poder seleccionar la encuesta disponible en el
 * @see Gson
 * @see UserData
 * @see SqliteHandler
 */
public class SeleccionaEncuestaActivity extends AppCompatActivity  implements  MyRecyclerViewAdapter.ItemClickListener{
    MyRecyclerViewAdapter adapter;
    SqliteHandler db;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.seleccionaencuestalayout);
        db = new SqliteHandler(this,SqliteHandler.SQLITE_DATABASE_NAME);
        ArrayList<String> encuestas_disponibles = new ArrayList<>();
        SqliteHandler sqliteHandler =  new SqliteHandler(this,SqliteHandler.SQLITE_DATABASE_NAME);
        JSONArray jsonArray_encuestas_data = null;
        try {
            jsonArray_encuestas_data = sqliteHandler.mostrarEncuestas();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        for(int i = 0 ; i< jsonArray_encuestas_data.length(); i++)
        {
            try {
                String nombre_encuesta = ((JSONObject)jsonArray_encuestas_data.get(i)).getString("TITULO");
                Log.d("encuestas_nombre", "onCreate: "+ jsonArray_encuestas_data.toString());
                encuestas_disponibles.add( ((JSONObject)jsonArray_encuestas_data.get(i)).getString("TITULO")    );
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        // set up the RecyclerView
        RecyclerView recyclerView = findViewById(R.id.recyclerEncuestasDisponibles);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new MyRecyclerViewAdapter(this, encuestas_disponibles);
        adapter.setClickListener(this);
        recyclerView.setAdapter(adapter);
       // Toast.makeText(this, encuestas_disponibles.toString(), Toast.LENGTH_SHORT).show();
    }
    @Override
    public void onItemClick(View view, int position) {
     //   Toast.makeText(this, "You clicked " + adapter.getItem(position) + " on row number " + position, Toast.LENGTH_SHORT).show();

    }
    public void TestEncuesta(View view) {
        Gson gson = new Gson();
        //UserData userData = gson.fromJson( getIntent().getExtras().getString(UserData.DATABUNDLE),UserData.class);
        UserData userData = new UserData();
        String [] test = {""};
        userData.setPreguntas(test);
        try {
            userData.crearRespuestas();
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
        Intent intent = new Intent(SeleccionaEncuestaActivity.this,MainActivity.class);
        intent.putExtra(UserData.DATABUNDLE,gson.toJson(userData));
        startActivity(intent);
        Animatoo.animateFade(SeleccionaEncuestaActivity.this);
        finish();
    }
}

class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerViewAdapter.ViewHolder> {
    private List<String> mData;
    private LottieAnimationView lottieAnimationView;
    private LayoutInflater mInflater;
    private Slider mslider;
    private ItemClickListener mClickListener;
    private Context mcontext;
    private Button encuestaBoton;
    SqliteHandler sqliteHandler ;
    // data is passed into the constructor
    MyRecyclerViewAdapter(Context context, List<String> data) {
        this.mInflater = LayoutInflater.from(context);
        mcontext = context;
        this.mData = data;
    }
    // inflates the row layout from xml when needed
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.menuencuestaitem, parent, false);
        return new ViewHolder(view);
    }
    // binds the data to the TextView in each row
    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        String animal = mData.get(position);
        final SqliteHandler sqliteHandler = new SqliteHandler(mcontext,SqliteHandler.SQLITE_DATABASE_NAME);

        holder.bottonencuesta.setText(mData.get(position));
        holder.bottonencuesta.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

               String [] preguntas =  sqliteHandler.mostrarPreguntasbyTituloEncuesta(mData.get(position));
                Gson gson = new Gson();
                for (String pregunta:preguntas) {
                    Log.d("preguntas_finales", "onClick: " + pregunta);
                }
                String encuestaid = sqliteHandler.getEncuestaid(mData.get(position));
                UserData userData = new UserData();
                userData.setPreguntas(preguntas);
                userData.setCuestionarioId(encuestaid);

                try {
                    userData.crearRespuestas();
                }
                catch (Exception ex)
                {
                    ex.printStackTrace();
                }
                Intent intent = new Intent(mcontext,MainActivity.class);
                intent.putExtra(UserData.DATABUNDLE,gson.toJson(userData));
                mcontext.startActivity(intent);
                Animatoo.animateFade(mcontext);
               // Toast.makeText(mcontext, "encuesta seleccionada", Toast.LENGTH_SHORT).show();
            }
        });
    }
    // total number of rows
    @Override
    public int getItemCount() {
        return mData.size();
    }
    // stores and recycles views as they are scrolled off screen
    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView myTextView;
        Slider slider ;
        Button bottonencuesta;
        LottieAnimationView lottieAnimationView;

        ViewHolder(View itemView) {
            super(itemView);
           bottonencuesta = itemView.findViewById(R.id.menuencuestabtn);
            //  myTextView = itemView.findViewById(R.id.tvAnimalName);
            itemView.setOnClickListener(this);
        }
        @Override
        public void onClick(View view) {
            if (mClickListener != null) mClickListener.onItemClick(view, getAdapterPosition());
        }
    }
    // convenience method for getting data at click position
    String getItem(int id) {
        return mData.get(id);
    }
    // allows clicks events to be caught
    void setClickListener(ItemClickListener itemClickListener) {
        this.mClickListener = itemClickListener;
    }
    // parent activity will implement this method to respond to click events
    public interface ItemClickListener {
        void onItemClick(View view, int position);
    }
}
