const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

//Schéma des données des utilisateurs
const userSchema = mongoose.Schema({ //La méthode schema() de mongoose permet de définir un schéma des données
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)
//Nous exportons ce schéma en tant que modèle Mongoose appelé "User"
module.exports = mongoose.model('User', userSchema)