export class Bitacora {
    USUARIO_ID: number;
    ACCION: string;
    FECHA: string;
    USUARIO_NAME: string;
    MAIL: string;

    constructor(idb = "", idu = 0, ide = "", acc ='', fe=''){
        this.USUARIO_ID = idu;
        this.ACCION = acc;
        this.FECHA = fe;
        this.USUARIO_NAME = idb;
        this.MAIL = ide;
    }
}


export class BitacoraUsuario {
    USUARIO: string;
    ACCION: string;
    FECHA: string;

    constructor(idb = 0, idu = '', ide = '', acc ='', fe=''){
        this.USUARIO = idu;
        this.ACCION = acc;
        this.FECHA = fe;
    }
}
