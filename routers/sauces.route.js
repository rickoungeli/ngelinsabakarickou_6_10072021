const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const sauceCtrl = require('../controllers/sauces.controllers')



/* ROUTES POUR LA GESTION DES SAUCES */
router.post('/', auth, multer, sauceCtrl.creerSauce) //Route pour créer une nouvelle sauce 
router.get("/", auth, sauceCtrl.renvoyerToutesLesSauces) //Route pour renvoyer le tableau de toutes les sauces de la bdd
router.get("/:id", auth, sauceCtrl.renvoyerUneSauce) //Route pour renvoyer la sauce ayant l'ID fourni
router.put("/:id", auth, sauceCtrl.modifierSauce) //Route pour mettre à jour la sauce ayant l'ID fourni
router.delete("/:id", auth, sauceCtrl.supprimerSauce) //Route pour supprimer la sauce ayant l'ID fourni
router.post("/:id/like", auth, sauceCtrl.aimerSauce) //Route pour définir le statut "J'aime" pour userID fourni

module.exports = router