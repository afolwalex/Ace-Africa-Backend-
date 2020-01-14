const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const HiringSchema = new Schema({
	first_name : {type : String, required: true} , 
    last_name : {type : String, required: true} ,
    company_name : {type : String, required: true}, 
	email : {type : String, required: true} ,
    number : {type: String, required: true},
	country: {type : String , required: true} , 
	createdOn : {type : Date , default : Date.now()}
})

module.exports = mongoose.model('Hiring' , HiringSchema)