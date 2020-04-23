export class Bitacora {
    ID_BITACORA: number;
    ID_USUARIO: number;
    ID_ESTRUCTURA: number;
    ACCION: string;
    FECHA: string;

    constructor(idb = 0, idu = 0, ide = 0, acc ='', fe=''){
        this.ID_BITACORA = idb;
        this.ID_USUARIO = idu;
        this.ID_ESTRUCTURA = ide;
        this.ACCION = acc;
        this.FECHA = fe;
    }
}


export class BitacoraUsuario {
    ID_BITACORA: number;
    USUARIO: string;
    ESTRUCTURA: string;
    ACCION: string;
    FECHA: string;

    constructor(idb = 0, idu = '', ide = '', acc ='', fe=''){
        this.ID_BITACORA = idb;
        this.USUARIO = idu;
        this.ESTRUCTURA = ide;
        this.ACCION = acc;
        this.FECHA = fe;
    }
}
