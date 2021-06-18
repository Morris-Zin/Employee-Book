const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: String, 
    // active or inActive
    active: {
        type: Boolean, 
        default: true,
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