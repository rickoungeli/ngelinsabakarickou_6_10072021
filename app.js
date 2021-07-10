const express = require("express")
var bodyParser = require('body-parser') //body-parser nous permet d'extraire les données en provenance du frontend en les transformant en objet json
const cors = require('cors')
const morgan = require("morgan")
const path = require("path") //le plugin path nus donne accès aux chemins de notre système de fichier

const sauceRoutes = require('./routers/sauces.route');
const userRoutes = require('./routers/users.route');
const app = express()


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json()) //Ici, on demande à body-parser de convertir le corps de la requête en objet JSON
app.use(morgan("dev"))
app.use(cors())

/* ENTETE DES REPONSES */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})



//On indique aux serveurs le chemin des routes à utiliser
app.use("/images", express.static(path.join(__dirname, 'images')))
app.use("/api/sauces", sauceRoutes)
app.use("/api/auth", userRoutes)

module.exports = app