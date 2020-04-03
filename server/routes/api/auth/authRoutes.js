const router = require('express').Router();
const controller = require("./authController");

router.get("/", controller.loginHealthCheck);
router.post("/login", controller.authenticateUser);

module.exports = router;