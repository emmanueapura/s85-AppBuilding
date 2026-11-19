
const express = require('express');
const mongoose = require('mongoose');
const { errorHandler } = require('../auth');
const WorkOut = require('../models/Workout.js');

module.exports.addWorkOut = (req, res) => {
    let newWorkOut = new WorkOut({
        userId: req.user.id,
        name: req.body.name,
        duration: req.body.duration
    });

    return newWorkOut.save()
        .then((result) => res.status(200).send(result))
        .catch(error => errorHandler(error, req, res));
};

module.exports.getMyWorkouts = (req, res) => {
    return WorkOut.find({ userId: req.user.id })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).send({
                    message: "Empty workouts"
                });
            }

            return res.status(200).send(result);
        })
        .catch(error => errorHandler(error, req, res));
};
