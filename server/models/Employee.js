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
    salary: {
        amount: Number, 
        currency: String,
    } ,
    address: String, 

    phoneNumber: Number, 
    
    paidDate: Number
}); 

module.exports = mongoose.model('Employee', employeeSchema)