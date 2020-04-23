const dao = require('../dbo/dao');

module.exports = {
    xYear: async (req,res,next) =>{
        sql = "select * from usuario where to_date(fecha_nacimiento,'dd/mm/yyyy') > to_date(:y,'yyyy')";
        console.log(req.body);
        const y = req.body.YEAR;
        
        dao.open(sql,[y],false,res);
    },
    tree: async (req, res, next) => {
        sql = "select e.id_estructura,e.nombre,u.username as propietario,t.nombre as tipo,e.c_padre"+
        " from estructura e, usuario u,tipo_estructura t"+
        " where e.id_tipo = t.id_tipo and"+
        " u.no_identificador = e.id_propietario"+
        " start with e.nombre = '/'"+
        " connect by prior id_estructura = c_padre";
        dao.open(sql,[],false,res);
    },
    bitacora: async (req,res,next) => {
        sql = "select b.id_bitacora, u.nombre as usuario, e.nombre as estructura, b.accion, b.fecha from bitacora b, usuario u, estructura e where b.id_usuario = u.no_identificador and b.id_estructura = e.id_estructura";
        dao.open(sql,[],false,res);
    },
    xEstructuras: async (req,res,next) =>{
        sql = "select u.no_identificador,u.username,u.correo,u.nombre,u.apellido,u.fecha_registro,count(*) as estructuras"+
        " from usuario u, estructura e"+
        " where e.id_propietario = u.no_identificador"+
        " group by u.no_identificador,u.username,u.correo,u.nombre,u.apellido,u.fecha_registro"+
        " having trunc(to_date(u.fecha_registro,'dd/mm/yyyy hh24:mi:ss')) = to_date(:dat,'dd/mm/yyyy')";
        const dat = req.body.DATE;
        console.log(req.body);
        dao.open(sql,[dat],false,res);
    },
    xFolder: async (req, res, next) => {
        sql = "select u.nombre,u.apellido,u.username, t.tipo_usuario"+
        " from bitacora b, estructura e, usuario u, tipo_usuario t"+
        " where b.id_usuario = u.no_identificador"+
        " and b.id_estructura = e.id_estructura"+
        " and t.id_tipo_usuario = u.id_tipo_usuario"+
        " and e.nombre = :nombre"+
        " and to_date(:fmin,'dd/mm/yyyy') < trunc(to_date(b.fecha,'dd/mm/yyyy hh24:mi:ss'))"+
        " and to_date(:fmax,'dd/mm/yyyy') > trunc(to_date(b.fecha,'dd/mm/yyyy hh24:mi:ss'))"
        const fmin = req.body.FMIN;
        const fmax = req.body.FMAX;
        const nombre = req.body.NOMBRE;
        dao.open(sql,[nombre,fmin,fmax],false,res);
    }
};