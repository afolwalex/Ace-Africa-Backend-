const Careers = require('../model/careers')
const Hiring = require('../model/hiring')
const Scc = require('../model/scc')
const {check ,query , sanitizeParams , sanitizeQuery ,  validationResult } = require('express-validator') 
const {sanitizeBody }  = require('express-validator')
const bcrypt           = require('bcryptjs')
const nodemailer       = require('nodemailer')
const fs               = require('fs')
const path             = require('path')


class App {
    constructor() {
		this.name = "ACE AFRICA - Making education sustainable"
		this.developer = "ACE AFRICA SOFTWARE DEVELOPER TEAM"
	}
	description(){
		return {
			name : this.name , 
			developer : this.developer 
		}
	}
	/**
	  * Controls get request to the home page 
	*/
	getIndex = (req , res , next) => {
		res.render('index' , {
			
			title  : this.description().name  , 
		    dev : this.description().developer
		})
	}
	
	getCareersPage = (req, res, next) => {
		res.render('careers', {title : "Careers Page"})
	}

	postCareers = [
		check('first_name').isLength({min : 3}).trim().withMessage('Name must be 3 characters and above') ,
		check('last_name').isLength({min : 3}).trim().withMessage('Name must be 3 characters and above') , 
        check('email').not().isEmpty().isEmail().normalizeEmail().trim()
		.withMessage('Please , provide a valid email ')
        .custom(value => {
            return Careers.findOne({'email' : value}).then(user => {
                if (user ) {
                    return Promise.reject(`You've applied before.`)	
			    }
            })
	    }), 
        async (req , res , next) => { 
	        const errors = validationResult(req)
	        if (!errors.isEmpty()) { 
			    res.json({error : errors.array()})
		        //res.render('signup' , {errors : errors.array()}) 
				return
	        }else {
				try {	
				    const {first_name , last_name, email , location, number }  = req.body 
			        
				    let user = new Careers({
						first_name : first_name ,
						last_name : last_name ,  
					    email : email ,  
					    location : location , 
						number : number
				    })
				    let ret = await user.save()
					if ( ret ) { 
						res.render('success')
					}
				}catch(error) {
					res.status(500).json(error)
					return
				}
			}
		}]
		
		getSccPage = (req, res, next) => {
			res.render('scc', {title : "Schools Code Club"})
		}
		
		getHires = (req, res, next) => {
			res.render('hire-developers', {title : "Hire Developers"})
		}

		postHires = [
			check('first_name').isLength({min : 3}).trim().withMessage('Name must be 3 characters and above') ,
			check('last_name').isLength({min : 3}).trim().withMessage('Name must be 3 characters and above') , 
			async (req , res , next) => { 
				const errors = validationResult(req)
				if (!errors.isEmpty()) { 
					res.json({error : errors.array()})
					//res.render('signup' , {errors : errors.array()}) 
					return
				}else {
					try {	
						const {first_name , last_name, company_name, email , number, country }  = req.body 
						
						let user = new Hiring({
							first_name : first_name ,
							last_name : last_name ,
							company_name : company_name,  
							email : email ,  
							number : number,
							country : country
						})
						let ret = await user.save()
						if ( ret ) { 
							res.render('success')
						}
					}catch(error) {
						res.status(500).json(error)
						return
					}
				}
			}]

			postScc = [
				check('name').isLength({min : 2}).trim().withMessage('Name must be 2 characters and above') ,
				async (req , res , next) => { 
					const errors = validationResult(req)
					if (!errors.isEmpty()) { 
						res.json({error : errors.array()})
						//res.render('signup' , {errors : errors.array()}) 
						return
					}else {
						try {	
							const {name , manager, applicants, level , location, stack}  = req.body 
							
							let user = new Scc({
								name : name ,
								manager : manager ,
								applicants : applicants,  
								level : level ,  
								location : location,
								stack : stack
							})
							let ret = await user.save()
							if ( ret ) { 
								res.render('success')
							}
						}catch(error) {
							res.status(500).json(error)
							return
						}
					}
				}]

}

const returnApp = new App()

module.exports = returnApp 
