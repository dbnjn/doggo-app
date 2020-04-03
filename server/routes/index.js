const router  = require("express").Router();

router.use("/api", require("./api/user"));
router.use("/api", require("./api/loginRegistration"));
router.use("/api", require("./api/auth"));

module.exports = router;