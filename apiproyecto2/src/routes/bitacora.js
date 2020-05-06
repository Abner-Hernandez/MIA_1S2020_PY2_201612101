const router = require("express-promise-router")();

const { 
    obtener,
    insertar
} = require("../controllers/bitacora");

router.get("/",obtener);

module.exports = router;