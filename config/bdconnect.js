const mongoose = require("mongoose")

//Connexion de l'API à la base de données 
mongoose.connect(process.env.DB_CONNECT, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
})
.then(console.log("connexion BD ok"))
.catch((err) => console.log("Connexion impossible à mongoDB", err))