const userSchema = require('../models/users.modele')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const RANDOM_TOKEN_SECRET = "kgklr95hjio36oyt74fful963ilr45yu7q122wimqvuk32ktbs74bek63"
//Fonction pour l'inscription du client
exports.signup = (req, res, next) => {
    if (req.body.email == null || req.body.password == null) return res.status(400)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new userSchema({
            email: req.body.email,
            password: hash
        })
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }))
        })
    .catch(error => res.status(500).json({  error  }))
}

//Fonction pour la connexion du client
exports.login = (req, res, next)=>{ 

    userSchema.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: "Mot de passe incorrect"})
            }
            res.status(200).json({
                userID: user._id,
                token: jwt.sign(
                    {userID: user.id},
                    "RANDOM_TOKEN_SECRET",
                    { expiresIn: '24h'}
                )

            })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}