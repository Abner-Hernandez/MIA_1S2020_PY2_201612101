package com.example.p2mia;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class login extends AppCompatActivity {
    boolean login_pass = false;
    boolean login_mail = false;
    String email, pass;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        final TextView reg = findViewById(R.id.registrarse_text);
        final EditText emailValidate = (EditText)findViewById(R.id.mail);
        final EditText passwordvalidate = (EditText)findViewById(R.id.password);
        final Button btn = (Button) findViewById(R.id.iniciarSecion);

        final String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";

        emailValidate .addTextChangedListener(new TextWatcher() {
            public void afterTextChanged(Editable s) {
                email = emailValidate.getText().toString().trim();
                if (email.matches(emailPattern) && s.length() > 0)
                {
                    //Toast.makeText(getApplicationContext(),"valid email address",Toast.LENGTH_SHORT).show();
                    login_mail = true;
                }
                else
                {
                    //Toast.makeText(getApplicationContext(),"Invalid email address",Toast.LENGTH_SHORT).show();
                    login_mail = false;
                }
            }
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
                // other stuffs
            }
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                // other stuffs
            }
        });


        final String passPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\\\S+$).{8,}$";

        passwordvalidate .addTextChangedListener(new TextWatcher() {
            public void afterTextChanged(Editable s) {
                pass = passwordvalidate.getText().toString().trim();
                if (pass.matches(passPattern) && s.length() > 0)
                {
                    //Toast.makeText(getApplicationContext(),"valid password",Toast.LENGTH_SHORT).show();
                    login_pass = true;
                }
                else
                {
                    //Toast.makeText(getApplicationContext(),"Invalid Password",Toast.LENGTH_SHORT).show();
                    login_pass = false;
                }
            }
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
                // other stuffs
            }
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                // other stuffs
            }
        });

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(login_mail)
                {
                    RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                    // Enter the correct url for your api service site
                    String url = "http://192.168.2.247:3000/api/user/id";
                    StringRequest sr = new StringRequest(Request.Method.POST,url, new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                        try {
                            email = emailValidate.getText().toString().trim();
                            pass = passwordvalidate.getText().toString().trim();
                            JSONArray data = new JSONArray(response);
                            String mail_user = data.getJSONObject(0).getString("MAIL");
                            String pass_user = data.getJSONObject(0).getString("PASSWORD_USER");

                            if(mail_user.equals(email) && pass_user.equals(pass))
                            {
                                DataPage.id = Integer.parseInt(data.getJSONObject(0).getString("USUARIO_ID"));
                                DataPage.Usuario = mail_user;
                                get_productos_client();
                                onBackPressed();
                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }


                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {

                        }
                    }){
                        @Override
                        protected Map<String,String> getParams(){
                            Map<String,String> params = new HashMap<String, String>();
                            params.put("MAIL",email);
                            return params;
                        }

                        @Override
                        public Map<String, String> getHeaders() throws AuthFailureError {
                            Map<String,String> params = new HashMap<String, String>();
                            params.put("Content-Type","application/x-www-form-urlencoded");
                            return params;
                        }
                    };
                    requestQueue.add(sr);
                }else
                {
                    Toast.makeText(getApplicationContext(),"Uno de los campos no cumple los requisitos",Toast.LENGTH_SHORT).show();
                }
            }
        });

        reg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent activity2Intent = new Intent(getApplicationContext(), register.class);
                startActivity(activity2Intent);
            }
        });
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
}
