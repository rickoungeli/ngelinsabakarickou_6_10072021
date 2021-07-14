//Importation des modules
const express = require("express")
const bodyParser = require('body-parser') //body-parser nous permet d'extraire les données en provenance du frontend en les transformant en objet json
const cors = require('cors')
//const morgan = require("morgan")
const mongoose = require("mongoose") 
const path = require("path") //le plugin path nous donne accès aux chemins de notre système de fichier
const server = express()
const sauceRoutes = require('./routers/sauces.route');
const userRoutes = require('./routers/users.route');

//Connexion de l'API à la base de données 
const userName = "admin"
const userPassword = "admin"
mongoose.connect(`mongodb+srv://${userName}:${userPassword}@cluster0.akvy0.mongodb.net/projet6?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then( console.log("connexion réussie") )
mongoose.set('useCreateIndex', true)


server.use(bodyParser.urlencoded({ extended: true}))
server.use(bodyParser.json()) //Ici, on demande à body-parser de convertir le corps de la requête en objet JSON
//server.use(morgan("dev"))
server.use(cors())

// ENTETE DES REPONSES 
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})



//On indique aux serveurs le chemin des routes à utiliser et les callback à appeller
server.use("/images", express.static(path.join(__dirname, 'images')))
server.use("/api/sauces", sauceRoutes)
server.use("/api/auth", userRoutes)





server.listen(3000)

