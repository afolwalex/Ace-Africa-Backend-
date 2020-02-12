const Careers = require('../model/careers')
const Hiring = require('../model/hiring')
const Scc = require('../model/scc')
const Digital = require('../model/digital_signup')
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

	getChatPage = (req, res, next) => {
		res.render('live-chat', {title : "Chat with Ace"})
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

				getskills = (req, res, next) => {
					res.render('digital-skills', {title : "Digital Skills"})
				}
				postSkills = [
					check('name').isLength({min : 5}).trim().withMessage('Name must be 5 characters and above') , 
        			check('email').not().isEmpty().isEmail().normalizeEmail().trim()
					.withMessage('Please , provide a valid email ')
        			.custom(value => {
            			return Digital.findOne({'email' : value}).then(user => {
                			if (user ) {
                    		return Promise.reject('E-mail already in use')	
			    			}
            			})
	    			}), 
        			check('password' ).isLength({min : 8}).trim().withMessage('Password too short'), 
	    			sanitizeBody('*').escape() ,  
					async (req , res , next) => { 
						const errors = validationResult(req)
						if (!errors.isEmpty()) { 
							res.render('digital-skills' , {errors : errors.array()}) 
							return
						}else {
							try {	
								const {name , email, password, country }  = req.body
								let userPass = await bcrypt.hash(password , 10)
								let user = new Digital({
									name : name ,
									email : email,
									password : userPass, 
									country : country 
								})
								let ret = await user.save()
								if ( ret ) { 
									res.render('success-signup')
								}
							}catch(error) {
								res.status(500).json(error)
								return
							}
						}
					}]

					getSkillsLogin = (req, res, next) => {
						res.render('login', {title : "Login"})
					}

					postSkillsLogin = [
						sanitizeBody('*').escape() , 
						async (req , res , next) => {
							try { 
								let user = await Digital.findOne({email : req.body.email})
								let validUser = await bcrypt.compare(req.body.password , user.password)
								if (validUser) {
									req.session.email = user.email 
									res.redirect(303 , user.organization)
								}else {
									res.render('login' , { error : 'Invalid Login details'})
								}
							}catch(errors) {
								res.render('login' , {error : errors})
							}
				  
						}
					]

					getUser = async (req , res , next ) => {
						if (req.session.email ) {
							try {
								let user = req.params.organization 
								let validUser = await Digital.findOne({name : req.params.organization})
								if (validUser) {
									if (validUser.profile) {
										let profileName = validUser.profile
										res.render("organization" , {profile : profileName , user : validUser})
									}else {
										res.render("organization" , {user : validUser})
									}
								}
							}catch(error) {
								res.redirect(303  , '/digital-skills/login')
								return
							}
						}else {
							res.redirect(303 , '/digital-skills/login')
							return 
						}
					}
					
					getLogout = (req , res , next ) => {
						try {
							if (req.session.email) {
								delete req.session.email 
								res.redirect(303 , '/digital-skills/login')
							}else {
								throw new Error("Problem signing out. We will handle this shortly")
							}
						}catch(error) {
							res.status(400).send(error)
						}
					}

					getProfile = async (req , res , next ) => {
						try {
							const userName = req.params.organization 
							const user = await Digital.findOne({name : userName})
							if ( user ) { 
								if (user.profile) {
									let profileName = user.profile
									res.render('user-profile' , {profile : profileName , user : user})
								}else {
									res.render('user-profile' , {user : user})
								}
							}else {
								res.redirect(303 , '/digital-skills/login')
							}
						}catch(error) {
							res.status(500).redirect(303 , '/digital-skills/login')
						}
					}
					deleteUser = async (req , res , next) => {
						//!check if the user has created some examinations and remove them  
						try { 
							let user = await Digital.deleteOne({name : req.params.organization}) 
							if ( user ) {
								res.redirect(303 , '/digital-skills')
							}
						}catch(error) {
							res.status(404).redirect(303 , '/digital-skills')
						}
					}
}

const returnApp = new App()

module.exports = returnApp 
