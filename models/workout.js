const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: true,
                trim: true,
            },
            name: {
                type: String,
                required: true,
                trim: true,
            },
            duration: {
                type: Number,
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            }
        }]
},
    {
        // adds a virtual property to compute properties
        toJSON: {
            virtuals: true,
        },
    }
);

// Creates a virtual property `totalDuration`
workoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0)

});

//the first var is the document collection
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
