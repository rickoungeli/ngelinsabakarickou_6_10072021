const jwt = require('jsonwebtoken')
const RANDOM_TOKEN_SECRET = "kgklr95hjio36oyt74fful963ilr45yu7q122wimqvuk32ktbs74bek63"

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET)
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User Id non valable'
        } else {
            next()
        }
    } catch (error){
        res.status(401).json({ error: error | "Requête non authentifiée"})
    }
}
