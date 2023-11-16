const express = require("express");
const router = express.Router();
const {getAllProduct, getProductById, createProduct} = require("../controllers/productController");

router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.post("/", createProduct);

module.exports = router;