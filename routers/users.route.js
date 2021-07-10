const express = require("express")
const router = express.Router()
const userCtrl = require('../controllers/users.controllers')


/* ROUTE INSCRIPTION */
router.post("/signup", userCtrl.signup)

/* ROUTE AUTHENTIFICATION */
router.post("/login", userCtrl.login)

module.exports = router