const dao = require('../dbo/dao');

module.exports = {
    generos: async (req,res,next) =>{
        sql = "select * from gender";
        dao.open(sql,[],false,res);
    },
    insert: async (req,res,next) => {
        sql = "insert into gender(gender_name) values(:genero)";
        const genero = req.body.GENDER_NAME;
        dao.open(sql,[genero],true,res);
    },
    eliminar: async (req,res,next) => {
        sql = "delete from gender where id_genero = :id";
        const id = req.body.GENDER_ID;
        dao.open(sql,[id],true,res);
    }
};