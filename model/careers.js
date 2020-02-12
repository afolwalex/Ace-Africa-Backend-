const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const CareerSchema = new Schema({
	first_name : {type : String, required: true} , 
	last_name : {type : String, required: true} , 
	email : {type : String, required: true} ,
    profile  : {type :String , default : "jellyfish.jpg"},
    number : {type: String, required: true},
	location : {type : String , default : false } , 
	createdOn : {type : Date , default : Date.now()}
})

module.exports = mongoose.model('Careers' , CareerSchema)