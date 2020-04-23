export class Opc {
    copiar: boolean;
    pegar: boolean;
    id_mov: number;
    mover: boolean;
    id_cop: number;

    constructor(c = false, p = true, e = 0, m = false, n = 0){
        this.copiar = c;
        this.pegar = p;
        this.id_mov = e;
        this.mover = m; 
        this.id_cop = n;
    }
}