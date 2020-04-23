export class Tipocliente {
    CLASS_CLIENT_ID: number;
    NAME_TYPE: string;
    CREDIT_AMOUNT: number;

    constructor(id = 0, tipo = '', credit = 0){
        this.CLASS_CLIENT_ID = id;
        this.NAME_TYPE = tipo;
        this.CREDIT_AMOUNT = credit;
    }
}
