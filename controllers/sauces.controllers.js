const sauceSchema = require('../models/sauces.modele')

//Fonction pour créer une sauce (méthode POST sur la route /api/sauces)
exports.creerSauce = (req, res, next) => { 
    console.log ("Demande de création de sauce")
    console.log(req)

    /*
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    const sauce = new sauceSchema({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
    .then(()=> res.status(201).json({ 'message': 'Sauce enregistrée'}))
    .catch(error => res.status(400).json({ error }))
*/
}

//Fonction pour renvoyer toutes les sauces au frontend
exports.renvoyerToutesLesSauces = (req, res, next)=>{ 
    console.log ("Demande liste de sauces")
    sauceSchema.find()
    .then( sauces =>res.status(200).json({ sauces }) )
    .catch(error => res.status(400).json({ error }))
}

//Fonction pour renvoyer une sauce au frontend
exports.renvoyerSauce = (req, res, next)=>{
    console.log ("Demande d'une sauce")
    sauceSchema.findOne({_id: req.params.id})
    .then( sauce =>res.status(200).json({ sauce }) )
    .catch(error => res.status(404).json({ error }))
}

//Fonction pour modifier une sauce
exports.modifierSauce = (req, res, next)=>{ 
    console.log ("Demande de modification d'une sauce")
    sauceSchema.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id }) //la méthode updateOne demande deux paramètres
    .then( () =>res.status(200).json({ 'message': 'Sauce modifiée' }) )
    .catch(error => res.status(400).json({ error }))
}

//Fonction pour supprimer une sauce
exports.supprimerSauce = (req, res, next)=>{ 
    console.log ("Demande de suppression d'une sauce")
    sauceSchema.deleteOne({_id: req.params.id})
    .then( () => res.status(200).json({ 'message': 'Sauce supprimée' }) )
    .catch(error => res.status(404).json({ error }))
}