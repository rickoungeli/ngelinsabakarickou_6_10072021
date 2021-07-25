//Importation des modules
const express = require("express")
const server = express()
require('dotenv').config({path: './config/.env'})
require('./config/bdconnect')
const bodyParser = require('body-parser') //body-parser nous permet d'extraire les données en provenance du frontend en les transformant en objet json
const cors = require('cors')
const path = require("path") //le plugin path nous donne accès aux chemins de notre système de fichier
const sauceRoutes = require('./routers/sauces.route')
const userRoutes = require('./routers/users.route')
const helmet = require('helmet')





server.use(bodyParser.urlencoded({ extended: true})) //permet de récupérer les données envoyées via un formulaire
server.use(bodyParser.json()) //Ici, on demande à body-parser de convertir le corps de la requête en objet JSON
server.use(cors())
server.use(helmet())

//Les routes à utiliser et les chemins des callback à appeler
server.use("/images", express.static(path.join(__dirname, 'images')))
server.use("/api/sauces", sauceRoutes)
server.use("/api/auth", userRoutes)




//Serveur
server.listen(process.env.PORT, () => {
    console.log(`Server écoute port ${process.env.PORT}`)
})

