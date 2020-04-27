export class User {
    constructor( nombre = '', apellido = '', password = '', correo = '', telefono = 0, fecha_nacimiento = '', direccion = '', id_tipo_usuario = 0, genero = '',est =0){
        //this.USUARIO_ID = no_identificador;
        this.USUARIO_NAME = nombre;
        this.LAST_NAMES = apellido;
        //this.ACCESS_KEY = username;
        this.PASSWORD_USER = password;
        this.MAIL = correo;
        this.TEL_NUMBER = telefono;
        //this.FOTOGRAFIA = foto;
        //this.ID_GENERO = id_genero;
        this.BIRTH_DATE = fecha_nacimiento;
        this.CLI_ADDRESS = direccion;
        this.TYPE_USUARIO_ID = id_tipo_usuario;
        this.GENDER_ID = genero;
        this.ESTADO = est;
        //this.TIPO_USUARIO = tipo_usuario;
    }

    USUARIO_ID: number;
    USUARIO_NAME: string;
    LAST_NAMES: string;
    //ACCESS_KEY: string;
    PASSWORD_USER: string;
    MAIL: string;
    TEL_NUMBER: number;
    //FOTOGRAFIA: string;
    //ID_GENERO: number;
    BIRTH_DATE: string;
    CLI_ADDRESS: string;
    ESTADO: number;
    TYPE_USUARIO_ID: number;
    GENDER_ID: string;
    AVAILABLE_CREDIT: number;
    CLASS_CLIENT_ID: number;
    NAME_TYPE: string;
    //TIPO_USUARIO: string;
}

export class UserBitacora {
    constructor(no_identificador = 0, nombre = '', apellido = '', username = '', correo = '', fecha_registro = '', est = 0){
        this.NO_IDENTIFICADOR = no_identificador;
        this.NOMBRE = nombre;
        this.APELLIDO = apellido;
        this.USERNAME = username;
        this.CORREO = correo;
        this.FECHA_REGISTRO = fecha_registro;
        this.ESTRUCTURAS = est
    }

    NO_IDENTIFICADOR: number;
    NOMBRE: string;
    APELLIDO: string;
    USERNAME: string;
    CORREO: string;
    FECHA_REGISTRO: string;
    ESTRUCTURAS: number
}
