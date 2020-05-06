const dao = require("../dbo/dao");


module.exports = {
    
    index: async (req,res,next) =>{
        sql = "select u.*, g.gender_name, t.name_type from usuario u, gender g, type_usuario t where u.gender_id = g.gender_id and u.type_usuario_id = t.type_usuario_id";
        dao.open(sql,[],false,res);
    },
    insert: async (req, res, next) =>{
        console.log(req.body);
        const nombre = req.body.USUARIO_NAME;
        const apellido = req.body.LAST_NAMES;
        const password = req.body.PASSWORD_USER;
        const correo = req.body.MAIL;
        const fecha_nacimiento = req.body.BIRTH_DATE;
        const direccion = req.body.CLI_ADDRESS;
        const id_tipo_usuario = parseInt(req.body.TYPE_USUARIO_ID);
        const id_cliente_t = parseInt(req.body.CLASS_CLIENT_ID);
        const telefono = parseInt(req.body.TEL_NUMBER);
        const credito = parseInt(req.body.AVAILABLE_CREDIT);
        const id_genero = parseInt(req.body.GENDER_ID);
        sql = "begin insertar_usuario(:nombre,:apellido,:password,:correo,:direccion,:telefono,:credito,:fecha_nacimiento,:id_cliente_t,:id_tipo_usuario,:id_genero); end;";
        console.log(nombre,apellido,password,correo,direccion,telefono,credito,fecha_nacimiento,id_cliente_t,id_tipo_usuario,id_genero);
        dao.open(sql,[nombre,apellido,password,correo,direccion,telefono,credito,fecha_nacimiento,id_cliente_t,id_tipo_usuario,id_genero],true,res);
    },
    insertSync: async (req, res,next) =>{
        sql = "begin insertarSincronizar(:us,:pass); end;"
    	console.log(req.body);        
	    const us = req.body.USERNAME;
        const pass = req.body.PASSWORD;
        dao.open(sql,[us,pass],true,res);
    },
    getById: async (req, res, next) =>{
        const mail = req.body.USUARIO_ID;
        sql = "select u.*, g.gender_name, t.name_type from usuario u, gender g, type_usuario t where u.gender_id = g.gender_id and u.type_usuario_id = t.type_usuario_id and usuario_id = :mail";
        dao.open(sql,[mail],false,res);
    },
    getByIdAndroid: async (req, res, next) =>{
        console.log(req.params);
        const username = req.params.USERNAME;
        sql = "select u.*, g.genero, t.tipo_usuario from usuario u, genero g, tipo_usuario t where u.id_genero = g.id_genero and u.id_tipo_usuario = t.id_tipo_usuario and username = :username";
        dao.open(sql,[username],false,res);
    },
    putById: async (req, res, next) =>{
        
        sql = "update usuario set usuario_name = :nombre, last_names = :apellido, password_user = :password, mail = :correo, tel_number = :telefono, gender_id = :id_genero, birth_date = :fecha_nacimiento, cli_address = :direccion, type_usuario_id = :id_tipo_usuarios, estado = 1 where usuario_id = :id";
        const nombre = req.body.USUARIO_NAME;
        const apellido = req.body.LAST_NAMES;
        const password = req.body.PASSWORD_USER;
        const correo = req.body.MAIL;
        const fecha_nacimiento = req.body.BIRTH_DATE;
        const direccion = req.body.CLI_ADDRESS;
        const id_tipo_usuario = parseInt(req.body.TYPE_USUARIO_ID);
        const telefono = parseInt(req.body.TEL_NUMBER);
        const id_genero = parseInt(req.body.GENDER_ID);
        const id = parseInt(req.body.USUARIO_ID);
        dao.open(sql,[nombre,apellido,password,correo,telefono,id_genero,fecha_nacimiento,direccion,id_tipo_usuario,id],true,res);
    },
    drop: async (req, res, next) =>{
        sql = "update usuario set estado = 2 where usuario_id = :id"; 
        const id = parseInt(req.params.username);
        dao.open(sql,[id],true,res);
        
    },
    verificar: async (req, res, next) =>{
        sql = "update usuario set estado = 1 where usuario_id = :id";
        const id = parseInt(req.params.username);
        dao.open(sql,[id],true,res);
    },
    reenviarCorreo: async (req, res, next) => {
        sql = "begin reenviarCorreo(:us); end;";
        const us = req.body.USERNAME;
        dao.open(sql,[us],true,res);
    },
    getidusuario: async (req,res,next) => {
        sql = "select u.*, g.gender_name, t.name_type from usuario u, gender g, type_usuario t where u.gender_id = g.gender_id and u.type_usuario_id = t.type_usuario_id and u.mail = :id";
        const id = req.body.MAIL;
        console.log(id);
        dao.open(sql,[id],false,res);
    },
    bitacora: async (req,res,next) => {
        sql = "begin insertar_bitacora(:usuario, :accion); end;";
        const usuario = parseInt(req.body.USUARIO);
        const accion = req.body.ACCION;
        console.log(req.body);
        dao.open(sql,[usuario,accion],false,res);
    }
};
