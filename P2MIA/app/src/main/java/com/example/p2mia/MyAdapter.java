package com.example.p2mia;

import android.content.Context;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MyAdapter extends ArrayAdapter {

    ArrayList<Producto> prod_c;
    Context mContext;

    public MyAdapter(@NonNull Context context, ArrayList<Producto> prod) {
        super(context, R.layout.listview_ite);
        this.mContext = context;
        this.prod_c = prod;
    }

    @Override
    public int getCount() {
        return this.prod_c.size();
    }

    @NonNull
    @Override
    public View getView(final int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        ViewHolder mViewHolder = new ViewHolder();
        final String[] data = {""};

        if(convertView == null) {
            LayoutInflater mInflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = mInflater.inflate(R.layout.listview_ite, parent, false);
            mViewHolder.pr = (ImageView) convertView.findViewById(R.id.imageView);
            mViewHolder.na = (TextView) convertView.findViewById(R.id.nombre_producto);
            mViewHolder.des = (TextView) convertView.findViewById(R.id.descripcion_producto);
            mViewHolder.pre = (TextView) convertView.findViewById(R.id.precio_producto);
            mViewHolder.disp = (TextView) convertView.findViewById(R.id.disponibles_producto);
            mViewHolder.cant = (EditText) convertView.findViewById(R.id.cantidad_add);
            mViewHolder.add_cart = (Button) convertView.findViewById(R.id.agregar_carrito);


            mViewHolder.cant.addTextChangedListener(new TextWatcher() {
                public void afterTextChanged(Editable s) {
                    data[0] = s.toString();
                }
                public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
                public void onTextChanged(CharSequence s, int start, int before, int count) {}
            });

            mViewHolder.add_cart.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    if(DataPage.id < 1)
                    {
                        Toast.makeText(mContext, "Es necesario que inicie secion para agregar el producto aa su carrito", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    if(data[0] == "")
                    {
                        Toast.makeText(mContext, "ingrese una cantidad para agregar al carrito", Toast.LENGTH_SHORT).show();
                        return;
                    }else if(Integer.parseInt(data[0]) > DataPage.productos.get(position).disponibles)
                    {
                        Toast.makeText(mContext, "La cantidad no debe excederse de los disponibles", Toast.LENGTH_SHORT).show();
                        return;
                    }else if(Integer.parseInt(data[0]) < 1)
                    {
                        Toast.makeText(mContext, "La cantidad debe ser mayor a 0", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    RequestQueue requestQueue = Volley.newRequestQueue(mContext);
                    // Enter the correct url for your api service site
                    String url = "http://192.168.2.247:3000/api/producto/icart";
                    StringRequest sr = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            Toast.makeText(mContext, "Insertado", Toast.LENGTH_SHORT).show();
                            get_productos_client();;
                            get_productos();
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Toast.makeText(mContext, "Error", Toast.LENGTH_SHORT).show();
                        }
                    }) {
                        @Override
                        protected Map<String, String> getParams() {
                            Map<String, String> params = new HashMap<String, String>();
                            params.put("USUARIO", Integer.toString(DataPage.id));
                            params.put("PRODUCTO", Integer.toString(prod_c.get(position).id));
                            params.put("CANTIDAD", data[0]);
                            params.put("PRECIO", Integer.toString(prod_c.get(position).precio));
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
            convertView.setTag(mViewHolder);
        }else{
            mViewHolder = (ViewHolder) convertView.getTag();
        }
            mViewHolder.na.setText(prod_c.get(position).nombre);
            mViewHolder.des.setText(prod_c.get(position).descripcion);
            mViewHolder.pre.setText("Precio: " + Integer.toString(prod_c.get(position).precio));
            mViewHolder.disp.setText("Disp: "+Integer.toString(prod_c.get(position).disponibles));
            Picasso.get().load(prod_c.get(position).url_imagen).into(mViewHolder.pr);


        return convertView;
    }

    private void get_productos()
    {
        RequestQueue queue = Volley.newRequestQueue(mContext);
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
                            ((productos)mContext).recreate();
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
        RequestQueue requestQueue = Volley.newRequestQueue(mContext);
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
                Toast.makeText(mContext, "Error", Toast.LENGTH_SHORT).show();
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

    static class ViewHolder{
        ImageView pr ;
        TextView na ;
        TextView des ;
        TextView pre ;
        TextView disp ;
        EditText cant ;
        Button add_cart ;
    }
}
