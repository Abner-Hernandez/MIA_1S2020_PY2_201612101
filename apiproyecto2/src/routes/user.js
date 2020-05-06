const router = require("express-promise-router")();

const { 
    index,
    insert,
    insertSync,
    getById,
    getByIdAndroid,
    putById,
    drop,
    verificar,
    reenviarCorreo,
    getidusuario,
    bitacora
} = require("../controllers/user");

router.get("/",index);
router.post("/",insert);
router.post("/sync",insertSync);
router.post("/get", getById);
router.get("/getA/:USERNAME", getByIdAndroid);
router.post("/update",putById);
router.post("/delete",drop);
router.get("/verificar/:username",verificar);
router.post("/reenviar",reenviarCorreo);
router.post("/id",getidusuario);
router.post("/bitacora",bitacora);


module.exports = router;
