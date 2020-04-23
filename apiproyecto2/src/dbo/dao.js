const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OBJECT;

cns = {
    user : process.env.NODE_ORACLEDB_USER || "Abner",
	password : process.env.NODE_ORACLEDB_PASSWORD || "renovation",
	connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost:1521/ORCL18",
	externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};

function error(err,rs,cn){
    if(err){
        console.log(err.message);
        rs.contentType("application/json").status(500);
        rs.send(err.message);
        if(cn != null) close(cn);
        return -1;
    }else{
        return 0;
    }
}


function open(sql,binds,dml,rs){
    oracledb.getConnection(cns,(err,cn) => {
        if (error(err,rs,null) == -1) return;
        cn.execute(sql,binds,{autoCommit: dml},(err,result) =>{
            if(error(err,rs,cn) == -1) return;
            rs.contentType("application/json").status(200);
            if(dml)
            rs.send(JSON.stringify(result.rowsAffected));
            else{
                rs.send(JSON.stringify(result.rows));
            }
            close(cn);
        })
    })
}

function close(cn){
    cn.release((err) =>{
        if(err) {console.error(err.message);}
    });
}
exports.open = open;
exports.close = close;