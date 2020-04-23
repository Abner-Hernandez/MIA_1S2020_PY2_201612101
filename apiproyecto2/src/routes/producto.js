const router = require("express-promise-router")();

const { 
    insert,
    getById,
    putById,
    eliminar,
} = require("../controllers/producto");

router.post("/",insert);
router.post("/get", getById);
router.post("/update",putById);
router.post("/eliminar",eliminar);


module.exports = router;
