const dao = require('../dbo/dao');

module.exports = {

    reporte2: async (req, res, next) =>{
        const year = parseInt(req.body.YEAR);
        sql = "select u.* from usuario u, type_usuario tu, gender g where to_date('01/01/'||:year ,'DD/MM/YY') < to_date(u.birth_date,'DD/MM/YY') and u.type_usuario_id = tu.type_usuario_id and lower(tu.name_type) = 'server' and g.gender_id= u.gender_id and lower(g.gender_name) = 'masculino'";
        dao.open(sql,[year],false,res);
    },
    reporte3: async (req, res, next) =>{
        const year = parseInt(req.body.YEAR);
        sql = "select u.* from usuario u, type_usuario tu, gender g where to_date('01/01/'||:year ,'DD/MM/YY') > to_date(u.birth_date,'DD/MM/YY') and u.type_usuario_id = tu.type_usuario_id and lower(tu.name_type) = 'administrador' and g.gender_id= u.gender_id and lower(g.gender_name) = 'femenino'";
        dao.open(sql,[year],false,res);
    },
    reporte4: async (req, res, next) =>{
        sql = "select u.* from usuario u, type_usuario tu where u.type_usuario_id = tu.type_usuario_id and lower(tu.name_type) = 'client'  ORDER BY u.profit_made desc";
        dao.open(sql,[],false,res);
    },
    reporte6: async (req, res, next) =>{
        sql = "select * from (select p.product_name, SUM(di.number_product)VENTAS from product p, detail_invoice di where p.product_id = di.product_id GROUP BY p.product_name ORDER BY SUM(di.number_product) desc) where ROWNUM < 4";
        dao.open(sql,[],false,res);
    },
    reporte7: async (req, res, next) =>{
        sql = "select * from (SELECT u.usuario_name, COUNT(*)PRODUCTOS from usuario u INNER JOIN product p ON p.usuario_id = u.usuario_id GROUP BY u.usuario_name ORDER BY COUNT(*) desc) where ROWNUM < 4";
        dao.open(sql,[],false,res);
    },
    reporte10: async (req, res, next) =>{
        const disponibles = parseInt(req.body.DISPONIBLES);
        sql = "select p.* from product p where p.available_number = :disponibles";
        dao.open(sql,[disponibles],false,res);
    },
    reporte11: async (req, res, next) =>{
        sql = "select b.*, u.usuario_name, u.mail from bitacora b , usuario u where b.usuario_id = u.usuario_id";
        dao.open(sql,[],false,res);
    },
};