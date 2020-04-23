export class Categoria {
    CATEGORY_ID: number;
    CATEGORY_NAME: string;
    CATEGORY_PARENT: number;
    CATEGORY_PARENT_NA: string;
    DESCRIPCION: string;

    constructor(_name_c = '', _name_cp = '', _id_c = 0, _id_cp = 0, _desc = ''){
        this.CATEGORY_NAME =  _name_c;
        this.CATEGORY_PARENT_NA = _name_cp;
        this.CATEGORY_ID = _id_c;
        this.CATEGORY_PARENT = _id_cp;
        this.DESCRIPCION = _desc;
    }
}
