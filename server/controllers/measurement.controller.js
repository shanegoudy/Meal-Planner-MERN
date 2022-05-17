const Measurement = require('../models/measurement.model');

module.exports.findAllMeasurements = (req, res) => {
    Measurement.find()
        .then((allDaMeasurements) => {
            res.json({ measurements: allDaMeasurements })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err})
        });}

module.exports.findOneMeasurement = (req, res) => {
    Measurement.findOne({ _id: req.params.id })
        .then(oneSingleMeasurement => {
            res.json({ measurement: oneSingleMeasurement })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.createNewMeasurement = (req, res) => {
    Measurement.create(req.body)
        .then(newlyCreatedMeasurement => {
            res.json({ measurement: newlyCreatedMeasurement })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateExistingMeasurement = (req, res) => {
    Measurement.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true}
    )
        .then(updateMeasurement => {
            req.json({ measurement: updatedMeasurement })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.deleteAnExistingMeasurement = (req, res) => {
    Measurement.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result})
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}