const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const SccSchema = new Schema({
	name : {type : String, required: true} , 
    manager : {type : String, required: true} ,
    applicants : {type : String, required: true}, 
	level : {type : String, required: true} ,
    location : {type: String, required: true},
	stack: {type : String , required: true } , 
	createdOn : {type : Date , default : Date.now()}
})

module.exports = mongoose.model('Scc' , SccSchema)