const router = require("express-promise-router")();

const {
    generos,
    insert,
    eliminar
} = require("../controllers/genero");

router.get("/",generos);
router.post("/insert",insert);
router.post("/delete",eliminar);

module.exports = router;