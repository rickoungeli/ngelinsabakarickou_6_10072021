const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.sprit(" ")[1]
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
        console.log("voici le token ")
        const userID = decodedToken.userID
        if (req.body.userID && req.body.userID !== userID) {
            throw 'User Id non valable'
        } else {
            next()
        }
    } catch (error){
        res.status(401).json({ error: error | "Requête non authentifiée"})
    }
}