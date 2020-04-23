const router = require("express-promise-router")();

const { 
    obtener,
    insertar
} = require("../controllers/bitacora");

router.get("/",obtener);
router.post("/insertar",insertar);

module.exports = router;