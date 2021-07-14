const sauceSchema = require('../models/sauces.modele')

//Fonction pour créer une sauce (méthode POST sur la route '/api/sauces')
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

//Fonction pour renvoyer toutes les sauces au frontend (méthode GET sur la route '/')
exports.renvoyerToutesLesSauces = (req, res, next)=>{ 
    sauceSchema.find()
    .then( sauces =>res.status(200).send(sauces) )
    .catch(error => res.status(400).send({ error }))
}

//Fonction pour renvoyer une sauce au frontend (méthode GET sur la route '/:id')
exports.renvoyerUneSauce = (req, res, next)=>{
    sauceSchema.findOne({_id: req.params.id})
    .then( sauce =>res.status(200).send(sauce) )
    .catch(error => res.status(404).send({ error }))
}

//Fonction pour modifier une sauce
exports.modifierSauce = (req, res, next)=>{ 
    console.log ("Demande de modification d'une sauce")
    //req.body.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    sauceSchema.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id} ) //la méthode updateOne demande deux paramètres
    .then( () =>res.status(200).send({'message': 'Sauce modifiée' }) )       
    .catch(error => res.status(400).send({ error }))
}

//Fonction pour supprimer une sauce
exports.supprimerSauce = (req, res, next)=>{ 
    console.log ("Demande de suppression d'une sauce")
    sauceSchema.deleteOne({_id: req.params.id})
    .then( () => res.status(200).send({'message': 'Sauce supprimée'}) )
    .catch(error => res.status(404).send({ error }))
}

//Fonction pour aimer une sauce

exports.aimerSauce = (req, res, next)=>{
    /* Dans ce middleware, je reçois l'ID de la sauce (req.params.id) et 
        un objet contenant dans req.body, une clé like avec une valeur (0, 1 ou -1) et une clé userId */
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
                    console.log("L'utilisateur n'aime pas la sauce  " )
                    sauce.usersDisliked.push(userId)
                    sauce.dislikes+=1
                    maj=true
                    break
                }
            case 1:
                if(posLiked < 0) { //Si userID n'est pas dans le tableau usersLiked, on l'ajoute
                    console.log("L'utilisateur aime la sauce " )
                    sauce.usersLiked.push(userId)
                    sauce.likes+=1
                    maj=true
                    break
                }
            case 0:
                if (posDisliked >= 0) {
                    console.log("L'utilisateur retire je n'aime pas la sauce: "  )
                    sauce.usersDisliked.pop(userId)
                    sauce.dislikes-=1
                    maj=true
                    break
                }
                if(posLiked >= 0) {
                    console.log("l'utilisateur retire son j'aime " )
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
