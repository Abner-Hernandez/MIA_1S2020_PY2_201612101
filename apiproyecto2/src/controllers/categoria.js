const dao = require('../dbo/dao');

module.exports = {
    categorias: async (req,res,next) =>{
        sql = "SELECT c.*, CASE WHEN c.category_parent is not null THEN (select sb.category_name from category sb where sb.category_id = c.category_parent)  ELSE null END as parent FROM category c";
        dao.open(sql,[],false,res);
    },
    por_id: async (req,res,next) =>{
        sql = "select * from category where category_id = :id";
        const id = req.body.CATEGORY_ID;
        dao.open(sql,[id],false,res);
    },
    categorias_padres: async (req,res,next) =>{
        sql = "select * from category where category_parent is null";
        dao.open(sql,[],false,res);
    },
    categorias_hijas: async (req,res,next) =>{
        const id_categoria = parseInt(req.body.CATEGORIA);
        console.log(id_categoria)
        sql = "select * from category where CATEGORY_PARENT = :id_categoria";
        dao.open(sql,[id_categoria],false,res);
    },
    insert: async (req,res,next) => {
        console.log(req.body);
        sql = "Begin insertar_categoria(:parent, :categoria, :descripcion); end;";
        const categoria = req.body.CATEGORY_PARENT_NA;
        const parent = req.body.CATEGORY_NAME;
        const descripcion = req.body.DESCRIPCION;
        dao.open(sql,[parent, categoria, descripcion],true,res);
    },
    eliminar: async (req,res,next) => {
        sql = "delete from category where category_id = :id";
        const id = req.body.CATEGORY_ID;
        dao.open(sql,[id],true,res);
    },
    update: async(req,res,next) =>{
        sql = "update category set category_name = :name , category_parent = :id_parent , descripcion = :descripcion where category_id = :id";
        const id = req.body.CATEGORY_ID;
        const name = req.body.CATEGORY_NAME;
        const id_parent = req.body.CATEGORY_PARENT;
        const descripcion = req.body.DESCRIPCION;
        dao.open(sql,[name,id_parent,descripcion,id],true,res);
    }
};