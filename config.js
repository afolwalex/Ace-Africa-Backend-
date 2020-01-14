/**
  * Non-secured configuration settings 
*/
const MONGO_OPTIONS = {
	URL : "mongodb+srv://afolwalex:cometome30@cluster0-acj9f.mongodb.net/test?retryWrites=true&w=majority" , 
    OPTIONS : {
	    useNewUrlParser : true , 
	    useCreateIndex : true , 
	    poolSize : 10 , 
	    keepAlive : true , 
	    useUnifiedTopology : true ,
	    keepAliveInitialDelay : 300000
	}
}
module.exports = MONGO_OPTIONS