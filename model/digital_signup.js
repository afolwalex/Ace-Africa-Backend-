const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const DigitalSchema = new Schema({
	name : {type : String, required: true} , 
    email : {type : String, required: true} , 
	password : {type : String, required: true} ,
	country: {type : String , required: true} , 
	createdOn : {type : Date , default : Date.now()}
})

DigitalSchema.virtual('organization').get(function() {
	return `/${this.name}`
})

module.exports = mongoose.model('Digital' , DigitalSchema)