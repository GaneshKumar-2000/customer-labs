const router = require("express").Router()
const accountRoutes = require("./accountRoute")

router.use("/account", accountRoutes);

module.exports = router