const dao = require('../dbo/dao');

module.exports = {
    tipos: async (req,res,next) =>{
        sql = "select * from type_client";
        dao.open(sql,[],false,res);
    },
    insert: async (req,res,next) => {
        sql = "insert into type_client(name_type,credit_amount) values(:tipo,:credit)";
        const tipo = req.body.NAME_TYPE;
        const credit = req.body.CREDIT_AMOUNT;
        dao.open(sql,[tipo,credit],true,res);
    },
    eliminar: async (req,res,next) => {
        sql = "delete from type_client where class_client_id = :id";
        const id = req.body.CLASS_CLIENT_ID;
        dao.open(sql,[id],true,res);
    }
};