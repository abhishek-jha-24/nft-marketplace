var express = require("express");
const UserController = require("../src/user/user.controller");

var router = express.Router();

// router.get("/", UserController.getUser);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;

