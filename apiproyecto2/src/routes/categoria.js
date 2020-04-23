const router = require("express-promise-router")();

const {
    categorias,
    por_id,
    categorias_padres,
    categorias_hijas,
    insert,
    eliminar,
    update
} = require("../controllers/categoria");

router.get("/",categorias);
router.get("/padres",categorias_padres);
router.post("/hijas",categorias_hijas);
router.post("/insert",insert);
router.post("/eliminar",eliminar);
router.post("/update",update);
router.post("/getbyid",por_id);

module.exports = router;