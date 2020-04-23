const dao = require('../dbo/dao');

module.exports = {
    tipos: async (req,res,next) =>{
        sql = "select * from type_usuario";
        dao.open(sql,[],false,res);
    },
    insert: async (req,res,next) => {
        sql = "insert into type_usuario(name_type) values(:tipo)";
        const tipo = req.body.NAME_TYPE;
        dao.open(sql,[tipo],true,res);
    },
    eliminar: async (req,res,next) => {
        sql = "delete from type_usuario where type_usuario_id = :id";
        const id = req.body.TYPE_USUARIO_ID;
        dao.open(sql,[id],true,res);
    }
};