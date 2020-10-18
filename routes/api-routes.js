var db = require("../models");

module.exports = function (app) {

    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body)
            .then(dbExercise => {
                res.json(dbExercise);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => res.json(err));
    });

    app.put("/api/workouts/:id", (req, res) => {
        console.log(req.params.id);
        db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true })
            .then((dbWorkout) => {
                res.json(dbWorkout);
            })
            .catch(err => res.json(err));
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .limit(7) // { day: 7} )
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    })

}