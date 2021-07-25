const sauceSchema = require('../models/sauces.modele')

//Middleware (fonction) pour créer une sauce (méthode POST sur la route '/api/sauces')
exports.creerSauce = (req, res, next) => { 
    const sauceACreer = JSON.parse(req.body.sauce) 
    console.log(sauceACreer)   
    const sauce = new sauceSchema({
        ...sauceACreer,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],        
        userId: sauceACreer.userId  //Où dois-je trouver cette valleur?
    })
    sauce.save()
    .then(()=> res.status(201).send({ 'message': 'Sauce enregistrée'}))
    .catch(error => {
        console.log("voici l'erreur : " + error)
        res.status(400).send({ error })
    })
}

//Middleware (fonction) pour renvoyer toutes les sauces au frontend (méthode GET sur la route '/')
exports.renvoyerToutesLesSauces = (req, res, next)=>{ 
    sauceSchema.find()
    .then( sauces =>res.status(200).send(sauces) )
    .catch(error => res.status(400).send({ error }))
}

//Middleware (fonction) pour renvoyer une sauce au frontend (méthode GET sur la route '/:id')
exports.renvoyerUneSauce = (req, res, next)=>{
    sauceSchema.findOne({_id: req.params.id})
    .then( sauce =>res.status(200).send(sauce) )
    .catch(error => res.status(404).send({ error }))
}

//Middleware (fonction) pour modifier une sauce
exports.modifierSauce = (req, res, next)=>{ 
    if(req.file) {
        req.body.sauce = JSON.parse(req.body.sauce)
        req.body.sauce.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        sauceSchema.updateOne({_id: req.params.id}, {...req.body.sauce, _id: req.params.id} )
        .then( () =>res.status(200).send({'message': 'Sauce modifiée' }) )       
        .catch(error => res.status(400).send({ error }))
    } else {
        sauceSchema.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id} ) //la méthode updateOne demande deux paramètres
        .then( () =>res.status(200).send({'message': 'Sauce modifiée' }) )       
        .catch(error => res.status(400).send({ error }))
    } 
}

//Middleware (fonction) pour supprimer une sauce
exports.supprimerSauce = (req, res, next)=>{ 
    sauceSchema.deleteOne({_id: req.params.id})
    .then( () => res.status(200).send({'message': 'Sauce supprimée'}) )
    .catch(error => res.status(404).send({ error }))
}

//Middleware (fonction) pour aimer une sauce
exports.aimerSauce = (req, res, next)=>{
    /* Dans ce middleware, je reçois l'ID de la sauce (req.params.id) et 
        un objet req.body contenant un like avec comme valeur (0, 1 ou -1) et un userId */
    let sauceId = req.params.id
    let likeValue = req.body.like
    let userId = req.body.userId
    let maj = false
    sauceSchema.findOne({_id: sauceId})
    .then( sauce => {
        let posDisliked = sauce.usersDisliked.indexOf(userId)
        let posLiked = sauce.usersLiked.indexOf(userId)
        switch (likeValue) {
            case -1:
                if(posDisliked < 0) { //Si userID n'est pas dans le tableau usersDisliked, on l'ajoute
                    sauce.usersDisliked.push(userId)
                    sauce.dislikes+=1
                    maj=true
                    break
                }
            case 1:
                if(posLiked < 0) { //Si userID n'est pas dans le tableau usersLiked, on l'ajoute
                    sauce.usersLiked.push(userId)
                    sauce.likes+=1
                    maj=true
                    break
                }
            case 0:
                if (posDisliked >= 0) { //L'utilisateur annule je n'aime pas la sauce
                    sauce.usersDisliked.pop(userId)
                    sauce.dislikes-=1
                    maj=true
                    break
                }
                if(posLiked >= 0) { //l'utilisateur annule son j'aime
                    sauce.usersLiked.pop(userId)
                    sauce.likes-=1
                    maj=true
                    break
                }
            default:
                res.status(200).send({ 'message': 'Mauvaise opération'})
        }
        if (maj === true) {
            sauceSchema.updateOne({_id: sauceId}, sauce) 
            .then(res.status(200).send({ 'message': 'Vous avez voté une sauce'}))
            .catch(error => res.status(400).send({ error }))
        }
    })
    .catch(error => res.status(404).send({ error }))   
}