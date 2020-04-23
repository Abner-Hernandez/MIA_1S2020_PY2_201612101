export class Producto {

    constructor(prod_name = '', prod_cod = '', price = 0, user_id = 0, available = 0, descrip = '', date = '', categoria = 0, img = ''){
        this.PRODUCT_NAME = prod_name;
        this.PRODUCT_COD = prod_cod;
        this.PRICE = price;
        this.USUARIO_ID = user_id;
        this.AVAILABLE_NUMBER = available;
        this.PROD_DESCRIPTION = descrip;
        this.REGISTER_DATE = date;
        this.CATEGORY_ID = categoria;
        this.URL_IMG = img;
    }

    PRODUCT_ID: number;
    PRODUCT_NAME: string;
    PRODUCT_COD: string;
    PRICE: number;
    USUARIO_ID: number;
    AVAILABLE_NUMBER: number;
    PROD_DESCRIPTION: string;
    REGISTER_DATE: string;
    CATEGORY_ID: number;
    URL_IMG: string;
}
