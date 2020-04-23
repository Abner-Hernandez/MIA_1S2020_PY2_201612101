export class Estructura {
    ID_ESTRUCTURA: number;
    ID_PROPIETARIO: number;
    NOMBRE: string;
    CONTENIDO: string;
    C_PADRE: number;
    ID_TIPO: number;
    PERMISO: string;
    ID_PARTICION: number;

    constructor(ide = 0, idp = 0, nombre = '', cont = '', cp = 0, idt = 0, idpa = 0, perm = '') {
        this.ID_ESTRUCTURA = ide;
        this.ID_PROPIETARIO = idp;
        this.NOMBRE = nombre;
        this.CONTENIDO = cont;
        this.C_PADRE = cp;
        this.ID_TIPO = idt;
        this.PERMISO = perm;
        this.ID_PARTICION = idpa;
    }
}

export class EstructuraReporte {
    ID_ESTRUCTURA: number;
    PROPIETARIO: string;
    NOMBRE: string;
    C_PADRE: number;
    TIPO: string;

    constructor(ide = 0, idp = '', nombre = '', cp = 0, idt = '') {
        this.ID_ESTRUCTURA = ide;
        this.PROPIETARIO = idp;
        this.NOMBRE = nombre;
        this.C_PADRE = cp;
        this.TIPO = idt;
    }
}
