const router = require("express-promise-router")();

const { 
    information,
    uNombre,
    uSlogan,
    uLogo,
    uVideo,
    uMision,
    uVision,
    uAbout,
    uDatos
} = require("../controllers/datos");

router.get("/",information);
router.post("/cambiar",uDatos);
router.post("/nombre",uNombre);
router.post("/slogan",uSlogan);
router.post("/logo",uLogo);
router.post("/video",uVideo);
router.post("/mision",uMision);
router.post("/vision",uVision);
router.post("/about",uAbout);


module.exports = router;