const express = require("express");
const router = express.Router();
const {getAllUser, getUserById, createUser, editUser, deleteUser, userLogin} = require("../controllers/userController");

router.get("/", getAllUser);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", editUser);

router.delete("/:id", deleteUser);

router.post("/login", userLogin);

module.exports = router;