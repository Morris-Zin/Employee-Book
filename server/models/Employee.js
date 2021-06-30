const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: String, 
    creator: {
        type: String, 
        required: true
    }, 
    // active or inActive
    active: {
        type: Boolean, 
        default: true,
    }, 
    imageUrl: {
        type: String, 
    }, 
    // Date they started working
    startDate: {
        type: String, 
    },
    salary: String, 
    address: String, 
    phoneNumber: Number, 
    addedDate: {
        type: Date, 
        default: new Date()
    }
}); 

module.exports = mongoose.model('Employee', employeeSchema)