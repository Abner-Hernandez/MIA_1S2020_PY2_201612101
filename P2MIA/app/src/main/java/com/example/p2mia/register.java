package com.example.p2mia;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
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

public class register extends AppCompatActivity {
    String email, pass;
    boolean pass_reg = false;
    boolean correo_reg = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        ArrayList<String> aux = new ArrayList<>();
        for(int i = 0; i < DataPage.generos.size() ; i++)
            aux.add(DataPage.generos.get(i).genero);

        Spinner s = (Spinner) findViewById(R.id.genero_r);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, aux);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        s.setAdapter(adapter);

        final EditText emailValidate = (EditText)findViewById(R.id.correo_r);
        final EditText nombres = (EditText)findViewById(R.id.nombres_r);
        final EditText apellidos = (EditText)findViewById(R.id.apellidos_r);
        final EditText contrasenia = (EditText)findViewById(R.id.contrasenia_r);
        final EditText direccion = (EditText)findViewById(R.id.direccion_r);
        final EditText telefono = (EditText)findViewById(R.id.telefono_r);
        final EditText fecha = (EditText)findViewById(R.id.fecha_r);
        final Button btn = (Button) findViewById(R.id.register);
        final Spinner gender = (Spinner)findViewById(R.id.genero_r);
        final String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";

        emailValidate .addTextChangedListener(new TextWatcher() {
            public void afterTextChanged(Editable s) {
                email = emailValidate.getText().toString().trim();
                if (email.matches(emailPattern) && s.length() > 0)
                {
                    //Toast.makeText(getApplicationContext(),"valid email address",Toast.LENGTH_SHORT).show();
                    correo_reg = true;
                }
                else
                {
                    //Toast.makeText(getApplicationContext(),"Invalid email address",Toast.LENGTH_SHORT).show();
                    correo_reg = false;
                }
            }
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
                // other stuffs
            }
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                // other stuffs
            }
        });


        final String passPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*+=?-]).{8,15}$";

        contrasenia.addTextChangedListener(new TextWatcher() {
            public void afterTextChanged(Editable s) {
                pass = contrasenia.getText().toString().trim();
                if (pass.matches(passPattern) && s.length() > 0)
                {
                    //Toast.makeText(getApplicationContext(),"valid password",Toast.LENGTH_SHORT).show();
                    pass_reg = true;
                }
                else
                {
                    //Toast.makeText(getApplicationContext(),"Invalid Password",Toast.LENGTH_SHORT).show();
                    pass_reg = false;
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
                final String tel = telefono.getText().toString().trim();
                final String dat = fecha.getText().toString().trim();
                final String dir = direccion.getText().toString().trim();
                final String ap = apellidos.getText().toString().trim();
                final String na = nombres.getText().toString().trim();

                if(correo_reg && pass_reg  && !tel.equals("") && !tel.equals("") && !dat.equals("") && !dir.equals("") && !ap.equals("") && !na.equals("") )
                {
                    RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                    // Enter the correct url for your api service site
                    String url = "http://192.168.2.247:3000/api/user";
                    StringRequest sr = new StringRequest(Request.Method.POST,url, new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            Toast.makeText(getApplicationContext(),"Insertado",Toast.LENGTH_SHORT).show();
                            onBackPressed();
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Toast.makeText(getApplicationContext(),"Error",Toast.LENGTH_SHORT).show();
                        }
                    }){
                        @Override
                        protected Map<String,String> getParams(){
                            Map<String,String> params = new HashMap<String, String>();
                            email = emailValidate.getText().toString().trim();
                            pass = contrasenia.getText().toString().trim();
                            int client_tipe = (int) (Math.random() * DataPage.tipos.size()-1);
                            int id_gen = 0;
                            String gen = gender.getSelectedItem().toString();

                            for(int i = 0 ; i < DataPage.generos.size(); i++)
                            {
                                if(gen.equals(DataPage.generos.get(i).genero))
                                {
                                    id_gen = DataPage.generos.get(i).id_genero;
                                    break;
                                }
                            }
                            params.put("USUARIO_NAME",na);
                            params.put("LAST_NAMES", ap);
                            params.put("PASSWORD_USER",pass);
                            params.put("CLI_ADDRESS",dir);
                            params.put("TEL_NUMBER",tel);
                            params.put("AVAILABLE_CREDIT",Integer.toString(DataPage.tipos.get(client_tipe).credito) );
                            params.put("BIRTH_DATE",dat);
                            params.put("TYPE_USUARIO_ID",Integer.toString(3));
                            params.put("CLASS_CLIENT_ID",Integer.toString(DataPage.tipos.get(client_tipe).id_tipo) );
                            params.put("GENDER_ID",Integer.toString(id_gen));
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

    }
}
