/**
  * Non-secured configuration settings 
*/
const MONGO_OPTIONS = {
	URL : "mongodb://127.0.0.1:27017/firstdb" , 
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