const router = require("express-promise-router")();

const { 
    enviarCorreo,
    recuperarCorreo
} = require("../controllers/email");

router.post("/email",enviarCorreo);
router.post("/emailrecovery",recuperarCorreo);


module.exports = router;