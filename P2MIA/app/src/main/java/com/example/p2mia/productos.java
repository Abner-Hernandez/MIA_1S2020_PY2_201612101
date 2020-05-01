package com.example.p2mia;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ListView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class productos extends AppCompatActivity {

    ListView nlistView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_productos);

        nlistView = (ListView) findViewById(R.id.products);
        MyAdapter myAdapter = new MyAdapter(productos.this,DataPage.productos);
        nlistView.setAdapter(myAdapter);
    }

    private void get_productos_client()
    {
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        // Enter the correct url for your api service site
        String url = "http://192.168.2.247:3000/api/producto/products_cart";
        StringRequest sr = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    JSONArray data = new JSONArray(response);
                    DataPage.productoscli = new ArrayList<>();

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
                        DataPage.productoscli.add(new Producto(id, nombre, codigo, precio, usuario, disponibles, description, imagen));
                        DataPage.productoscli.get(i).carrito_num = Integer.parseInt(data.getJSONObject(i).getString("NUMBER_PRODUCT"));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), "Error", Toast.LENGTH_SHORT).show();
            }
        }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("ID_USUARIO", Integer.toString(DataPage.id));
                return params;
            }

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Content-Type", "application/x-www-form-urlencoded");
                return params;
            }
        };
        requestQueue.add(sr);
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
                            ((productos)productos.this).recreate();

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

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }
}
