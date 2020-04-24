const router = require("express-promise-router")();

const { 
    insert,
    getById,
    getIdproducto,
    putById,
    eliminar,
    get_all_colors,
    insertar_color,
    editar_color,
    eliminar_color,
    insertar_producto_color,
    eliminar_producto_color,
    colorsbyproducto
} = require("../controllers/producto");

router.post("/",insert);
router.post("/get", getById);
router.post("/get_id", getIdproducto);
router.post("/update",putById);
router.post("/eliminar",eliminar);
router.get("/gcolor",get_all_colors);
router.post("/icolor",insertar_color);
router.post("/edcolor",editar_color);
router.post("/ecolor",eliminar_color);
router.post("/productocolori",insertar_producto_color);
router.post("/productocolord",eliminar_producto_color);
router.post("/colorbyid", colorsbyproducto);


module.exports = router;
