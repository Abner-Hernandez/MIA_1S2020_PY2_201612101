package com.example.p2mia;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.tabs.TabLayout;
import com.squareup.picasso.Picasso;
import org.json.JSONArray;
import org.json.JSONException;
import java.io.IOException;
import java.util.ArrayList;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        final TextView textView = this.findViewById(R.id.infotab);
        final TextView eslog = this.findViewById(R.id.slogan);
        final TextView name = this.findViewById(R.id.name_page);
        final ImageView img = this.findViewById(R.id.logotipo);
        final Button loginButton = findViewById(R.id.loginbutton);
        final Button tienda = findViewById(R.id.storebutton);
        final Button finishShop = findViewById(R.id.shopping);

        get_data_page(textView, img, name, eslog);
        //get_generos();
        //get_tipos_cliente();
        get_productos();
        DataPage.productos = new ArrayList<>();
        DataPage.num_act = 0;

        if(DataPage.productos == null)
            get_productos();

        final TabLayout tab = this.findViewById(R.id.tabs);

        tab.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                switch (tab.getPosition()) {
                    case 0:
                        textView.setText(DataPage.mision);
                        break;
                    case 1:
                        textView.setText(DataPage.vision);
                        break;
                    case 2:
                        textView.setText(DataPage.about);
                        break;
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
            }
        });

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(DataPage.id < 1)
                {
                    Intent activity2Intent = new Intent(getApplicationContext(), login.class);
                    startActivity(activity2Intent);
                }else
                {
                    DataPage.id = 0;

                }
            }
        });

        finishShop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(DataPage.id < 1)
                {
                    Toast.makeText(getApplicationContext(),"Inicie Secion para poder finalizar su compra",Toast.LENGTH_SHORT).show();
                }else
                {
                    Intent activity2Intent = new Intent(getApplicationContext(), facturar.class);
                    startActivity(activity2Intent);
                }
            }
        });

        tienda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent activity2Intent = new Intent(getApplicationContext(), productos.class);
                startActivity(activity2Intent);
            }
        });

    }


    private void get_data_page(final TextView view, final ImageView img, final TextView namep, final TextView slog)
    {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="http://192.168.2.247:3000/api/datos";

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Display the first 500 characters of the response string.
                        try {
                            JSONArray data = new JSONArray(response);
                            get_data(data, view, img, namep, slog);
                        } catch (JSONException | IOException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
            }
        });

        // Add the request to the RequestQueue.
        queue.add(stringRequest);
    }

    private void get_data(JSONArray data, TextView view, ImageView img, TextView namep, TextView slog) throws JSONException, IOException {
        DataPage.nombre = data.getJSONObject(0).getString("PAGE_NAME");
        DataPage.eslogan = data.getJSONObject(0).getString("PAGE_SLOGAN");
        DataPage.logo = data.getJSONObject(0).getString("PAGE_LOGO");
        DataPage.video = data.getJSONObject(0).getString("PAGE_VIDEO");
        DataPage.mision = data.getJSONObject(0).getString("PAGE_MISSION");
        DataPage.vision = data.getJSONObject(0).getString("PAGE_VISION");
        DataPage.about = data.getJSONObject(0).getString("PAGE_ABOUT");
        view.setText(DataPage.mision);
        namep.setText(DataPage.nombre);
        slog.setText(DataPage.eslogan);

        Picasso.get().load(DataPage.logo).into(img);
    }

    private void get_generos()
    {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="http://192.168.2.247:3000/api/generos";

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Display the first 500 characters of the response string.
                        try {
                            JSONArray data = new JSONArray(response);
                            DataPage.generos = new ArrayList<>();
                            for(int i = 0; i < data.length(); i++)
                            {
                                int id = Integer.parseInt(data.getJSONObject(i).getString("GENDER_ID"));
                                String genero = data.getJSONObject(i).getString("GENDER_NAME");
                                DataPage.generos.add(new Genero(id, genero));
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
            }
        });

        // Add the request to the RequestQueue.
        queue.add(stringRequest);
    }

    private void get_tipos_cliente()
    {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="http://192.168.2.247:3000/api/tipocliente";

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Display the first 500 characters of the response string.
                        try {
                            JSONArray data = new JSONArray(response);
                            DataPage.tipos = new ArrayList<>();
                            for(int i = 0; i < data.length(); i++)
                            {
                                int id = Integer.parseInt(data.getJSONObject(i).getString("CLASS_CLIENT_ID"));
                                String tipo = data.getJSONObject(i).getString("NAME_TYPE");
                                int credit_amount = Integer.parseInt(data.getJSONObject(i).getString("CREDIT_AMOUNT"));
                                DataPage.tipos.add(new Tipo_Cliente(id, tipo, credit_amount));
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
            }
        });

        // Add the request to the RequestQueue.
        queue.add(stringRequest);
    }

    private void get_productos()
    {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="http://192.168.2.247:3000/api/producto/gproducts";

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Display the first 500 characters of the response string.
                        try {
                            JSONArray data = new JSONArray(response);
                            DataPage.productos = new ArrayList<>();

                            for(int i = 0; i < data.length(); i++)
                            {
                                int id = Integer.parseInt(data.getJSONObject(i).getString("PRODUCT_ID"));
                                String nombre = data.getJSONObject(i).getString("PRODUCT_NAME");
                                String codigo = data.getJSONObject(i).getString("PRODUCT_COD");
                                int precio = Integer.parseInt(data.getJSONObject(i).getString("PRICE"));
                                int usuario = Integer.parseInt(data.getJSONObject(i).getString("USUARIO_ID"));
                                int disponibles = Integer.parseInt(data.getJSONObject(i).getString("AVAILABLE_NUMBER"));
                                String description = data.getJSONObject(i).getString("PROD_DESCRIPTION");
                                String imagen = data.getJSONObject(i).getString("URL_IMG");
                                DataPage.productos.add(new Producto(id, nombre, codigo, precio, usuario, disponibles, description, imagen));
                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
            }
        });

        // Add the request to the RequestQueue.
        queue.add(stringRequest);
    }

}
