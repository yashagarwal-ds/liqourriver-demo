const express = require("express");
const router = express.Router();
const {getAllProduct, getProductById, createProduct, editProduct, deleteProduct} = require("../controllers/productController");

router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", editProduct);

router.delete("/:id", deleteProduct);

module.exports = router;