const http = require('http')
const app = require('./app')

const mongoose = require("mongoose")

const server = http.createServer(app) 
const userName = "admin"
const userPassword = "admin"


//Connexion de l'API à la base de données 
mongoose.connect(`mongodb+srv://${userName}:${userPassword}@cluster0.akvy0.mongodb.net/projet6?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then( console.log("connexion réussie") )


server.listen(3000)

