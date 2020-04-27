const router = require("express-promise-router")();

const {
    reporte2,
    reporte3,
    reporte4,
    reporte6,
    reporte7,
    reporte10
} = require("../controllers/reportes");

router.post("/reporte2",reporte2);
router.post("/reporte3",reporte3);
router.get("/reporte4",reporte4);
router.get("/reporte6",reporte6);
router.get("/reporte7",reporte7);
router.post("/reporte10",reporte10);


module.exports = router;