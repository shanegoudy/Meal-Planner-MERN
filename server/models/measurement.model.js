const mongoose = require('mongoose');


const MeasurementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    }
});

const Ingredient = mongoose.model('Measurement', MeasurementSchema);

module.exports = Ingredient;