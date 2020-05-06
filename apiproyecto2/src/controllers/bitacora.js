const dao = require("../dbo/dao");


module.exports = {
    
    obtener: async (req,res,next) =>{
        //sql = "insert into gg(gg) values('sjs');";
        sql = "select b.*, u.usuario_name, u.mail from bitacora b , usuario u where b.usuario_id = u.usuario_id";
        dao.open(sql,[],false,res);
    }

};