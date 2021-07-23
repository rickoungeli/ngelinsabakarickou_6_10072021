//Importation des modules
const express = require("express")
const server = express()
require('dotenv').config({path: './config/.env'})
const bodyParser = require('body-parser') //body-parser nous permet d'extraire les données en provenance du frontend en les transformant en objet json
const cors = require('cors')
const mongoose = require("mongoose") 
const path = require("path") //le plugin path nous donne accès aux chemins de notre système de fichier
const sauceRoutes = require('./routers/sauces.route')
const userRoutes = require('./routers/users.route')
const helmet = require('helmet')


//Connexion de l'API à la base de données 
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
.then( console.log("connexion réussie") )
mongoose.set('useCreateIndex', true)


server.use(bodyParser.urlencoded({ extended: true})) //permet de récupérer les données envoyées via un formulaire
server.use(bodyParser.json()) //Ici, on demande à body-parser de convertir le corps de la requête en objet JSON
server.use(cors())
server.use(helmet())

//On indique aux serveurs le chemin des routes à utiliser et les callback à appeller
server.use("/images", express.static(path.join(__dirname, 'images')))
server.use("/api/sauces", sauceRoutes)
server.use("/api/auth", userRoutes)





server.listen(process.env.PORT)

