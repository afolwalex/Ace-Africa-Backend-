const express = require('express');
const router = express.Router();
const IndexController = require('../controller/index_controller')
const multer           = require('multer')
let storage = multer.diskStorage({
	destination : function(req , file , cb) {
		cb(null , './public/uploads/profile')
	} , 
	filename : function(req , file , cb) { 
	    let f = req.params.organization + file.originalname 
		cb(null , f) 
	}
})

let upload = multer({storage : storage})

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.get('/' , IndexController.getIndex)
router.get('/careers' , IndexController.getCareersPage)
router.post('/careers' , IndexController.postCareers)
router.get('/scc', IndexController.getSccPage)
router.post('/scc', IndexController.postScc)
router.get('/hire-developers', IndexController.getHires)
router.post('/hire-developers', IndexController.postHires)
module.exports = router
