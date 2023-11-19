const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/Users", userController.getAllUsers);
router.get("/User/:Id", userController.getUserById);
router.get("/User/Email/:Email", userController.getUserByEmail); // Changed route for clarity
router.post("/User/create", userController.register);
router.post("/User/login", userController.login);
router.post("/User/resetPassword", userController.resetPassword);

router.put("/User/update/:Id", userController.updateUserProfile);
router.put("/User/update/activate/:Id", userController.updateUserActivation);
router.delete("/User/delete/:Id", userController.deleteUser);

module.exports = router;

