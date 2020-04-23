export class Tipousuario {
    TYPE_USUARIO_ID: number;
    NAME_TYPE: string;

    constructor(id = 0, tipo = ''){
        this.TYPE_USUARIO_ID = id;
        this.NAME_TYPE = tipo;
    }
}
