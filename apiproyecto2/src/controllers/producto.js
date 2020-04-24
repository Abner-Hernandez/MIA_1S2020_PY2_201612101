const dao = require("../dbo/dao");


module.exports = {
    
    insert: async (req, res, next) =>{
        const nombre = req.body.PRODUCT_NAME;
        const codigo = req.body.PRODUCT_COD;
        const price = parseInt(req.body.PRICE);
        const usuario = parseInt(req.body.USUARIO_ID);
        const disponibles = parseInt(req.body.AVAILABLE_NUMBER);
        const descripcion = req.body.PROD_DESCRIPTION;
        const imagen = req.body.URL_IMG;
        const categoria_id = parseInt(req.body.CATEGORY_ID);
        sql = "begin insertar_producto(:nombre, :codigo, :price, :usuario, :disponibles,:descripcion, :categoria_id, :imagen); end;";
        dao.open(sql,[nombre,codigo,price,usuario,disponibles,descripcion,categoria_id, imagen],true,res);
    },
    getIdproducto: async (req, res, next) =>{
        console.log(req.body);
        const id = req.body.PRODUCT_NAME;
        sql = "select * from product where PRODUCT_NAME = :id";
        dao.open(sql,[id],false,res);
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
        dao.open(sql,[disponibles, price, descripcion, codigo, categoria_id, nombre, imagen, product_id],true,res);
    },
    eliminar: async (req,res,next) => {
        sql = "delete product where product_id = :id";
        const id = req.body.PRODUCT_ID;
        console.log(id);
        dao.open(sql,[id],true,res);
    },
    get_all_colors: async (req, res, next) =>{
        sql = "select * from color";
        dao.open(sql,[],false,res);
    },
    insertar_color: async (req, res, next) =>{
        const color = req.body.COLOR_NAME;
        sql = "INSERT INTO color(color_name) VALUES(:color)";
        dao.open(sql,[color],true,res);
    },
    editar_color: async (req, res, next) =>{
        const color = req.body.COLOR_NAME;
        const id = req.body.COLOR_ID;
        sql = "update color set color_name = :color where color_id = :id";
        dao.open(sql,[color, id],true,res);
    },
    eliminar_color: async (req, res, next) =>{
        const color = req.body.COLOR_NAME;
        sql = "delete color where color_name = :color";
        dao.open(sql,[color],true,res);
    },
    insertar_producto_color: async (req, res, next) =>{
        const color_id = parseInt(req.body.COLOR_ID);
        const prod_id = parseInt(req.body.PRODUCT_ID);
        sql = "INSERT INTO PRODUCTO_COLOR(COLOR_ID, PRODUCT_ID) VALUES(:color_id, :prod_id)";
        dao.open(sql,[color_id, prod_id],true,res);
    },
    eliminar_producto_color: async (req, res, next) =>{
        const color_id = parseInt(req.body.COLOR_ID);
        const prod_id = parseInt(req.body.PRODUCT_ID);
        sql = "DELETE PRODUCTO_COLOR where where color_id = :color_id and product_id = :prod_id)";
        dao.open(sql,[color_id, prod_id],true,res);
    },
    colorsbyproducto: async (req, res, next) =>{
        const prod_id = parseInt(req.body.PRODUCT_ID);
        console.log(prod_id);
        sql = "SELECT c.*, CASE  WHEN c.color_id is not null THEN (select sb.color_name from color sb where sb.color_id = c.color_id) ELSE null END as parent FROM PRODUCTO_COLOR c where c.product_id = :prod_id";
        dao.open(sql,[prod_id],false,res);
    }
    
};
