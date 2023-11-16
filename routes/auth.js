const express = require("express");
const router = express.Router();
const {getAllUser, getUserById, createUser, userLogin} = require("../controllers/userController");

router.get("/", getAllUser);

router.get("/:id", getUserById);

router.post("/", createUser);

router.post("/login", userLogin);

module.exports = router;