const router = require("express-promise-router")();

const { 
    insert,
    insert_invoice,
    insert_invoice_prod,
    insertcart,
    getById,
    getIdproducto,
    putById,
    eliminar,
    get_all_colors,
    get_all_products,
    insertar_color,
    editar_color,
    eliminar_color,
    insertar_producto_color,
    eliminar_producto_cart,
    eliminar_producto_color,
    colorsbyproducto,
    productsbycategory,
    productsearch,
    get_products_cart,
    eliminar_aux_table,
    masive_load
} = require("../controllers/producto");

router.post("/",insert);
router.post("/icart",insertcart);
router.post("/invoice_product",insert_invoice_prod);
router.post("/insertinvoice",insert_invoice);
router.post("/get", getById);
router.post("/get_id", getIdproducto);
router.post("/update",putById);
router.post("/eliminar",eliminar);
router.get("/gcolor",get_all_colors);
router.get("/gproducts",get_all_products);
router.post("/icolor",insertar_color);
router.post("/edcolor",editar_color);
router.post("/ecolor",eliminar_color);
router.post("/productocolori",insertar_producto_color);
router.post("/productocart",eliminar_producto_cart);
router.post("/productocolord",eliminar_producto_color);
router.post("/colorbyid", colorsbyproducto);
router.post("/productsbycategory", productsbycategory);
router.post("/productsearch", productsearch);
router.post("/products_cart", get_products_cart);
router.get("/delete_aux",eliminar_aux_table);
router.post("/carga_masiva",masive_load);






module.exports = router;
