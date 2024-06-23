const router = require("express").Router()
const accountRoutes = require("./accountRoute")
const destinationRoutes = require("./destinationRoute")

router.use("/account", accountRoutes);
router.use("/destination", destinationRoutes);

module.exports = router