const MeasurementController = require('../controllers/measurement.controller');

module.exports = app => {
    app.get('/api/measurements', MeasurementController.findAllMeasurements);
    app.get('/api/measurements/:id', MeasurementController.findOneMeasurement);
    app.put('/api/measurements/:id', MeasurementController.updateExistingMeasurement);
    app.post('/api/measurements', MeasurementController.createNewMeasurement);
    app.delete('/api/measurements/:id', MeasurementController.deleteAnExistingMeasurement);
}