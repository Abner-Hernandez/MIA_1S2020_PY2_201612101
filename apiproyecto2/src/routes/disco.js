const router = require("express-promise-router")();

const {
    crearEstructura,
    discosById,
    obtenerArbol,
    obtenerRaiz,
    obtenerRaizAndroid,
    obtenerHijosAndroid,
    obtenerHijos,
    actualizarContenido,
    eliminarEstructura,
    renombrarEstructura,
    moverEstructura,
    copiarEstructura
} = require("../controllers/disco");

router.get("/todo",obtenerArbol);
router.post("/crear",crearEstructura);
router.post("/raiz",obtenerRaiz);
router.get("/raizA/:ID",obtenerRaizAndroid);
router.get("/hijosA/:ID",obtenerHijosAndroid);
router.post("/hijos",obtenerHijos);
router.post("/cont",actualizarContenido);
router.post("/eliminar",eliminarEstructura);
router.post("/renombrar",renombrarEstructura);
router.post("/mover",moverEstructura);
router.post("/copiar",copiarEstructura);

module.exports = router;
