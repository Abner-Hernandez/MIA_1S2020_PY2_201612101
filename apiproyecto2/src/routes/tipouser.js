const router = require("express-promise-router")();

const {
    tipos,
    insert,
    eliminar
} = require("../controllers/tipouser");

router.get("/",tipos);
router.post("/insert",insert);
router.post("/delete",eliminar);

module.exports = router