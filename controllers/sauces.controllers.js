const sauceSchema = require('../models/sauces.modele')

//Fonction pour créer une sauce (méthode POST sur la route '/api/sauces')
exports.creerSauce = (req, res, next) => { 
    const sauceObject = JSON.parse(req.body.sauce)    
    const sauce = new sauceSchema({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],        
        userId: "60e885ec2d53891cb43a9394"  //Où dois-je trouver cette valleur?
    })
    sauce.save()
    .then(()=> res.status(201).json({ 'message': 'Sauce enregistrée'}))
    .catch(error => {
        console.log("voici l'erreur : " + error)
        res.status(400).json({ error })
    })
}

//Fonction pour renvoyer toutes les sauces au frontend (méthode GET sur la route '/')
exports.renvoyerToutesLesSauces = (req, res, next)=>{ 
    sauceSchema.find()
    .then( sauces =>res.status(200).send(sauces) )
    .catch(error => res.status(400).json({ error }))
}

//Fonction pour renvoyer une sauce au frontend (méthode GET sur la route '/:id')
exports.renvoyerUneSauce = (req, res, next)=>{
    sauceSchema.findOne({_id: req.params.id})
    .then( sauce =>res.status(200).send(sauce) )
    .catch(error => res.status(404).json({ error }))
}

//Fonction pour modifier une sauce
exports.modifierSauce = (req, res, next)=>{ 
    console.log ("Demande de modification d'une sauce")
    sauceSchema.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id }) //la méthode updateOne demande deux paramètres
    .then( () =>res.status(200).send( 'Sauce modifiée' ) )
    .catch(error => res.status(400).json({ error }))
}

//Fonction pour supprimer une sauce
exports.supprimerSauce = (req, res, next)=>{ 
    console.log ("Demande de suppression d'une sauce")
    sauceSchema.deleteOne({_id: req.params.id})
    .then( () => res.status(200).send('Sauce supprimée') )
    .catch(error => res.status(404).json({ error }))
}

//Fonction pour aimer une sauce

exports.aimerSauce = (req, res, next)=>{
    /* Dans ce middleware, je reçois l'ID de la sauce (req.params.id) et 
        un objet contenant dans req.body, une clé like avec une valeur (0, 1 ou -1) */
    let sauceId = req.params.id
    let likeValue = req.body.like
    
    sauceSchema.findOne({_id: sauceId})
    .then( sauce => {
        
        let posDisliked = sauce.usersDisliked.indexOf('60e885ec2d53891cb43a9394')
        let posLiked = sauce.usersLiked.indexOf('60e885ec2d53891cb43a9394')
        let maj = false
        switch (likeValue) {
            case -1:
                if(posDisliked < 0) { //Si userID n'est pas dans le tableau usersDisliked, on l'ajoute
                    console.log("L'utilisateur n'aime pas la sauce  " )
                    sauce.usersDisliked.push("60e885ec2d53891cb43a9394")
                    sauce.dislikes+=1
                    maj = true
                    break
                }
            case 1:
                if(posLiked < 0) {
                    console.log("L'utilisateur aime la sauce " )
                    sauce.usersLiked.push("60e885ec2d53891cb43a9394")
                    sauce.likes+=1
                    maj = true
                    break
                }
            case 0:
                if (posDisliked >= 0) {
                    console.log("L'utilisateur retire je n'aime pas la sauce: "  )
                    sauce.usersDisliked.pop("60e885ec2d53891cb43a9394")
                    sauce.dislikes-=1
                    maj = true
                    break
                }
                if(posLiked >= 0) {
                    console.log("l'utilisateur retire son j'aime " )
                    sauce.usersLiked.pop("60e885ec2d53891cb43a9394")
                    sauce.likes-=1
                    maj = true
                    break
                }

            default:
                res.status(200).json({ 'message': 'Mauvaise opération'})
        }
        if (maj === true) {
            sauceSchema.updateOne({_id: sauceId}, sauce) 
            .then(res.status(200).json({ 'message': 'Statut modifié'}))
            .catch(error => res.status(400).json({ error }))
        }
        
    })
    .catch(error => res.status(404).json({ error }))

    
        
}
