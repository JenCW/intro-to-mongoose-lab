const mongoose = require('mongoose');

// Define the Customer Schema
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
});

// Export the Customer Model
module.exports = mongoose.model('Customer', customerSchema);
