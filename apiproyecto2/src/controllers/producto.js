const dao = require("../dbo/dao");


module.exports = {
    
    insert: async (req, res, next) =>{
        const nombre = req.body.PRODUCT_NAME;
        const codigo = req.body.PRODUCT_COD;
        const price = parseInt(req.body.PRICE);
        const usuario = req.body.USUARIO_ID;
        const disponibles = parseInt(req.body.AVAILABLE_NUMBER);
        const descripcion = req.body.PROD_DESCRIPTION;
        const imagen = req.body.URL_IMG;
        const categoria_id = parseInt(req.body.CATEGORY_ID);
        sql = "begin insertar_producto(:nombre, :codigo, :price, :usuario, :disponibles,:descripcion, :categoria_id, :imagen); end;";
        dao.open(sql,[nombre,codigo,price,usuario,disponibles,descripcion,categoria_id, imagen],true,res);
    },
    getById: async (req, res, next) =>{
        console.log(req.body);
        const id = req.body.ID_USUARIO;
        sql = "select * from product where usuario_id = :id";
        dao.open(sql,[id],false,res);
    },
    putById: async (req, res, next) =>{
        sql = "update product set available_number = :disponibles,price = :price, prod_description = :descripcion, product_cod = :codigo, category_id = :categoria_id, product_name = :nombre, url_img = :imagen where product_id = :product_id";
        const nombre = req.body.PRODUCT_NAME;
        const codigo = req.body.PRODUCT_COD;
        const price = parseInt(req.body.PRICE);
        const disponibles = parseInt(req.body.AVAILABLE_NUMBER);
        const descripcion = req.body.PROD_DESCRIPTION;
        const categoria_id = parseInt(req.body.CATEGORY_ID);
        const product_id = parseInt(req.body.PRODUCT_ID);
        const imagen = req.body.URL_IMG;
        dao.open(sql,[disponibles, price, descripcion, codigo, categoria_id, nombre, product_id, imagen],true,res);
    },
    eliminar: async (req,res,next) => {
        sql = "delete from producto where product_id = :id";
        const id = req.body.PRODUCT_ID;
        dao.open(sql,[id],true,res);
    },
};
