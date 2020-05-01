package com.example.p2mia;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
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

public class facturar extends AppCompatActivity {
    ListView nlistView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_facturar);

        nlistView = (ListView) findViewById(R.id.productsfacturar);
        MyAdapterInvoice myAdapter = new MyAdapterInvoice(facturar.this,DataPage.productoscli);
        nlistView.setAdapter(myAdapter);

        TextView total = (TextView) findViewById(R.id.total_pagar);
        Button pagar = (Button) findViewById(R.id.paying_invoice);
        int total_pagar = 0;
        if(DataPage.productoscli.size() > 0)
        {
            for(int i = 0 ; i < DataPage.productoscli.size() ; i++)
            {
                total_pagar += DataPage.productoscli.get(i).precio * DataPage.productoscli.get(i).carrito_num;
            }
            total.setText("Total a Pagar: "+ Integer.toString(total_pagar));
        }

        pagar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                // Enter the correct url for your api service site
                String url = "http://192.168.2.247:3000/api/producto/insertinvoice";
                StringRequest sr = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(getApplicationContext(), "Factura Creada", Toast.LENGTH_SHORT).show();

                        for(int i = 0 ; i < DataPage.productoscli.size(); i++)
                        {
                            RequestQueue requestQueue1 = Volley.newRequestQueue(getApplicationContext());
                            // Enter the correct url for your api service site
                            String url = "http://192.168.2.247:3000/api/producto/invoice_product";
                            final int finalI = i;
                            StringRequest sr = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    Toast.makeText(getApplicationContext(), "Producto agregado a la factura", Toast.LENGTH_SHORT).show();
                                    get_productos_client();
                                }
                            }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Toast.makeText(getApplicationContext(), "Error al agregar el producto a la factura", Toast.LENGTH_SHORT).show();
                                }
                            }) {
                                @Override
                                protected Map<String, String> getParams() {
                                    Map<String, String> params = new HashMap<String, String>();
                                    params.put("USUARIO", Integer.toString(DataPage.id));
                                    params.put("PRODUCTO", Integer.toString(DataPage.productoscli.get(finalI).id));
                                    params.put("CANTIDAD", Integer.toString(DataPage.productoscli.get(finalI).carrito_num));
                                    params.put("PRECIO", Integer.toString(DataPage.productoscli.get(finalI).precio));
                                    return params;
                                }

                                @Override
                                public Map<String, String> getHeaders() throws AuthFailureError {
                                    Map<String, String> params = new HashMap<String, String>();
                                    params.put("Content-Type", "application/x-www-form-urlencoded");
                                    return params;
                                }
                            };
                            requestQueue1.add(sr);
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
                        params.put("USUARIO", Integer.toString(DataPage.id));
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
        });
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
                    onBackPressed();
                    //((facturar)facturar.this).recreate();
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

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }
}
