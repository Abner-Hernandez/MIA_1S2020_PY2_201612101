const dao = require("../dbo/dao");

module.exports = {
    discosById: async (req, res, next) => {
        sql="select * from particion p, usuarioparticion up, usuario p where p.id_particion = up.id_particion and up.id_usuario = u.id_usuario and u.id_usuario = :id";
        const id = req.body.ID_USUARIO;
        dao.open(sql,[id],false,res);
    },
    actualizarContenido: async (req, res, next) => {
        sql="update estructura set contenido = :cont where id_estructura = :id";
        const id = req.body.ID_ESTRUCTURA;
        const cont = req.body.CONTENIDO;
        dao.open(sql,[cont,id],true,res);
    },
    crearEstructura: async (req, res, next) => {
        sql = "insert into estructura(id_estructura, permiso, id_propietario, nombre, contenido, c_padre,id_tipo,id_particion) values(seq_carpeta.nextval,'664',:idp,:nombre,:cont,:idc,:idt,:idpa)"
        const idu = req.body.ID_PROPIETARIO;
        const nombre = req.body.NOMBRE;
        const idc = req.body.C_PADRE;
        const idt = req.body.ID_TIPO;
        const idpa = req.body.ID_PARTICION;
        const cont = req.body.CONTENIDO;
        dao.open(sql,[idu,nombre,cont,idc,idt,idpa],true,res);
    },
    obtenerArbol: async (req, res, next) => {
        sql = "SELECT * FROM carpeta START WITH id_carpeta = 1 CONNECT BY PRIOR id_carpeta = c_padre";
        dao.open(sql,[],false,res);
    },
    obtenerRaiz: async (req, res, next) => {
        sql = "select e.id_estructura, e.id_propietario, e.nombre, e.contenido, e.c_padre, e.id_tipo, e.id_particion"+
        " from estructura e, usuario u, usuarioparticion up, particion p"+
        " where u.no_identificador = up.id_usuario"+
        " and up.id_particion = p.id_particion"+
        " and p.id_particion = e.id_particion"+
        " and e.nombre = '/'"+
        " and u.no_identificador = :id";
        const id = req.body.NO_IDENTIFICADOR;
        console.log(req.body);
        dao.open(sql,[id],false,res);
    },
    obtenerRaizAndroid: async (req, res, next) => {
        sql = "select e.id_estructura, e.id_propietario, e.nombre, e.contenido, e.c_padre, e.id_tipo, e.id_particion"+
        " from estructura e, usuario u, usuarioparticion up, particion p"+
        " where u.no_identificador = up.id_usuario"+
        " and up.id_particion = p.id_particion"+
        " and p.id_particion = e.id_particion"+
        " and e.nombre = '/'"+
        " and u.no_identificador = :id";
        const id = parseInt(req.params.ID);
        console.log(req.params);
        dao.open(sql,[id],false,res);
    },
    obtenerHijosAndroid: async (req, res, next) => {
        //sql = "select e.id_estructura, e.id_propietario, e.nombre, e.contenido, e.c_padre, e.id_tipo, e.permiso"+
        sql = "select *"+
        " from estructura e"+
        " where e.c_padre = :id";
        const id = parseInt(req.params.ID);
	    console.log(req.params);
        dao.open(sql,[id],false,res);
    },
    obtenerHijos: async (req, res, next) => {
        //sql = "select e.id_estructura, e.id_propietario, e.nombre, e.contenido, e.c_padre, e.id_tipo, e.permiso"+
        sql = "select *"+
        " from estructura e"+
        " where e.c_padre = :id";
        const id = req.body.C_PADRE;
        dao.open(sql,[id],false,res);
    },
    renombrarEstructura: async (req, res, next) =>{
        sql = "update estructura set nombre = :nomb where id_estructura = :id";
        const nomb = req.body.NOMBRE;
        const id = req.body.ID_ESTRUCTURA;
        dao.open(sql,[nomb,id],true,res);
    },
    eliminarEstructura: async (req,res,next) => {
        sql = "delete from estructura where id_estructura = :id";
        const id = req.body.ID_ESTRUCTURA;
        dao.open(sql,[id],true,res);
    },
    moverEstructura: async (req, res, next) => {
        console.log(req.body);
        sql = "update estructura set c_padre = :p where id_estructura = :pa";
        const p = req.body.C_PADRE;
        const pa = req.body.ID_ESTRUCTURA;
        dao.open(sql,[p,pa],true,res);
    },
    copiarEstructura: async (req, res, next) => {
        sql = "begin copiar(:pa,:p); end;";
        const p = req.body.C_PADRE;
        const pa = req.body.ID_ESTRUCTURA;
        dao.open(sql,[pa,p],true,res);
    }
};
