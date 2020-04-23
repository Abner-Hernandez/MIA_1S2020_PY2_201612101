export class Arbol {
    id: number;
    name: string;
    children: Arbol[];
    constructor(_id = 0, _name = ''){
        this.id = _id;
        this.name = _name;
        this.children = [];
    }
}

export class FlatArbol {
    expandable: boolean;
    name: string;
    id: number;
    tipo: number;
    id_padre: number;
    contenido: string;
    permisos: string;
    level: number;
    
    constructor(exp = false, nam = '', id = 0, level = 0, tip = 0,cont = '',perm = ''){
        this.expandable = exp;
        this.name = nam;
        this.id = id;
        this.tipo = tip;
        this.contenido = cont;
        this.permisos = perm;
        this.level = level;
    }
}
