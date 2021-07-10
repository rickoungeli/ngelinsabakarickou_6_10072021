const mongoose = require('mongoose');

//Schéma des données des sauces
const sauceSchema = mongoose.Schema({ //La méthode schema() de mongoose permet de définir un schéma des données
  name: { type: String, required: true },  //nom de la sauce
  manufacture: { type: String, required: true }, //fabricant de la sauce
  description: { type: String, required: true },  //description de la sauce
  mainPepper: { type: String, required: true },  //principal ingrédient de la sauce
  imageUrl: { type: String, required: true },  //url de l'image de la sauce téléchargée par l'utilisateur
  heat: { type: Number, required: true }, //nombre entre 1 et 10 décrivant la sauce
  likes: { type: Number, required: true }, //nombre d'utilisateurs qui aiment la sauce
  dislikes: { type: Number, required: true }, //nombre d'utilisateurs qui n'aiment pas la sauce
  usersLiked: { type: [String], required: true }, //tableau d'identifiants d'utilisateurs ayant aimé la sauce
  usersDisliked: { type: [String], required: true }, //tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce
  userId: { type: String, required: true }
})

//Nous exportons ce schéma en tant que modèle Mongoose appelé "Sauce"
module.exports = mongoose.model('Sauce', sauceSchema)