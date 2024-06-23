const router = require("express").Router()
const accountRoutes = require("./accountRoute")
const destinationRoutes = require("./destinationRoute")
const serverRoutes = require("./serverRoute")

router.use("/account", accountRoutes);
router.use("/destination", destinationRoutes);
router.use("/server", serverRoutes)

module.exports = router