const dao = require("../dbo/dao");


module.exports = {
    
    obtener: async (req,res,next) =>{
        //sql = "insert into gg(gg) values('sjs');";
        sql = "select u.nombre,u.username, e.nombre, b.accion, b.fecha from usuario u, estructura e, bitacora b where u.no_identificador = b.id_usuario and e.id_estructura = b.id_estructura";
        dao.open(sql,[],false,res);
    },
    insertar: async (req,res,next) => {
        sql = "insert into bitacora(id_bitacora,id_usuario,id_estructura,accion,fecha) values(seq_bitacora,:idu,:ide,:acc,(SELECT TO_CHAR(sysdate,'DD/MM/YYYY HH24:MI:SS') from dual))"
        const idu = req.body.ID_USUARIO;
        const ide = req.body.ID_ESTRUCTURA;
        const acc = req.body.ACCION;
        dao.open(sql,[idu,ide,acc],false,res);
    }
};