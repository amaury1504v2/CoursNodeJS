const router = require('express').Router(); 
let Exercise = require('../models/exercise');
const auth = require('../middleware/auth')

router.route('/', auth).get((req, res) => {
    Exercise.find() //méthode mongoose qui permet d'obtenir une liste de tous les exercices de la bdd mongoose atlas
        .then(exercises => res.json(exercises)) //on va obtenir tous les exercices sous le format json
        .catch(err => res.status(400).json('Error: ' + err)) //s'il y a une erreur, retourner Error + err
});

router.route('/add', auth).post((req, res) => { //s'occupe des requêtes post (d'où l'URL add)
    const username = req.body.username; console.log(username);
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    console.log(username, description, duration, date);
    

    const newExercise = new Exercise({ //on instancie l'exercice
        username: username,
        description: description,
        duration: duration,
        date: date,
    });

    newExercise.save() //on enregistre l'exercice
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id', auth).get((req, res) => { // /:id= object id créé par mongodb 
    console.log(req.params.id);
    
    Exercise.findById(req.params.id) // prend l'id de l'url au-dessus   
        .then(exercise => res.json(exercise)) //ensuite, on retourne l'exercice
        .catch(err => res.status(400).json('Error' + err)); // sinon, on retourne l'erreur
});

router.route('/:id', auth).delete((req, res) => { 
    Exercise.findByIdAndDelete(req.params.id)    
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error' + err)); 
});

router.route('/update/:id', auth).post((req, res) => {
    Exercise.findById(req.params.id)    
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
            .then(() => res.json('Exercise updated.'))
            .catch(err => res.status(400).json('Error' + err)); 
        }) 
        .catch(err => res.status(400).json('Error' + err)); 
});

module.exports = router;