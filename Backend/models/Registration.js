const mongoose = require('mongoose');
const RegistrationSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    
    gender: {
        type: String,
        required: true
    },
    contactno: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = { Registration };
