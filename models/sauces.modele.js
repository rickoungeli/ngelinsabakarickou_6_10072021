const mongoose = require('mongoose');

//Schéma des données des sauces
const sauceSchema = mongoose.Schema({ //La méthode schema() de mongoose permet de définir un schéma des données
  name: { type: String, required: true, trim: true },  //nom de la sauce
  manufacturer: { type: String, required: true, trim: true }, //fabricant de la sauce
  description: { type: String, required: true, trim: true },  //description de la sauce
  mainPepper: { type: String, required: true, trim: true },  //principal ingrédient de la sauce
  imageUrl: { type: String, required: true, trim: true },  //url de l'image de la sauce téléchargée par l'utilisateur
  heat: { type: Number, required: true, trim: true }, //nombre entre 1 et 10 décrivant la sauce
  likes: { type: Number, required: true, trim: true }, //nombre d'utilisateurs qui aiment la sauce
  dislikes: { type: Number, required: true, trim: true }, //nombre d'utilisateurs qui n'aiment pas la sauce
  usersLiked: { type: [String], required: true, trim: true }, //tableau d'identifiants d'utilisateurs ayant aimé la sauce
  usersDisliked: { type: [String], required: true, trim: true }, //tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce
  userId: { type: String, required: true, trim: true }
})

//Nous exportons ce schéma en tant que modèle Mongoose appelé "Sauce"
module.exports = mongoose.model('Sauce', sauceSchema)