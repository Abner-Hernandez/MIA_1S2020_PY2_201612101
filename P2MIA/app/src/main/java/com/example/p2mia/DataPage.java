package com.example.p2mia;

import java.util.ArrayList;

class Genero{
    public int id_genero;
    public String genero;
    public Genero(int id, String genero)
    {
        this.id_genero = id;
        this.genero = genero;
    }
}

class Tipo_Cliente{
    public int id_tipo;
    public String tipo;
    public int credito;
    public Tipo_Cliente(int id, String tipo, int credito)
    {
        this.id_tipo = id;
        this.tipo = tipo;
        this.credito = credito;
    }
}

class Producto{
    public int id;
    public String nombre;
    public String codigo;
    public int precio;
    public int usuario_id;
    public int disponibles;
    public int carrito_num;
    public String descripcion;
    public String url_imagen;

    public Producto(int id, String nombre, String codigo, int precio, int usuario_id, int disponibles, String descripcion, String url_imagen)
    {
        this.id = id;
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
        this.usuario_id = usuario_id;
        this.disponibles = disponibles;
        this.descripcion = descripcion;
        this.url_imagen = url_imagen;
        this.carrito_num = -1;
    }
}

public class DataPage {
    public static String logo;
    public static String video;
    public static String mision;
    public static String vision;
    public static String nombre;
    public static String about;
    public static String eslogan;
    public static String Usuario;
    public static String tipo_de_usuario;
    public static int id;
    public static ArrayList<Genero> generos ;
    public static ArrayList<Tipo_Cliente> tipos ;
    public static ArrayList<Producto> productos ;
    public static ArrayList<Producto> productoscli ;
    public static int num_act;
}
