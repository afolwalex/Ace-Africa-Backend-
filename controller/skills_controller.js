const {check ,query , sanitizeParams , sanitizeQuery ,  validationResult } = require('express-validator') 
const {sanitizeBody }  = require('express-validator')
const bcrypt           = require('bcryptjs')
const nodemailer       = require('nodemailer')
const fs               = require('fs')
const path             = require('path')


getskills = (req, res, next) => {
    res.render('digital-skills', {title : "Digital Skills"})
}