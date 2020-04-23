const router = require("express-promise-router")();

const {
    xYear,
    tree,
    bitacora,
    xEstructuras,
    xFolder
} = require("../controllers/reportes");

router.post("/xYear",xYear);
router.get("/tree",tree);
router.get("/bitacora",bitacora);
router.post("/xEstructuras",xEstructuras);
router.post("/xFolder",xFolder);

module.exports = router;