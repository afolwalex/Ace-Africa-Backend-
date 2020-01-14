/** 
  * Design the schema and the model for the examiner document 
*/
  
const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const AppSchema = new Schema({
	name : {type : String } , 
	description : {type : String} , 
	expected_users : {type : Number } 
})



module.exports = mongoose.model('App' , AppSchema)
