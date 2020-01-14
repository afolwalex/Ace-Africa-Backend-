/**
 * Require dependencies 
*/
import {validateName , validateEmail , validatePassword , verifyPassword } from "./validate.js" 

 //!Helper function for uniquely selecting DOM elements  
let selector = e => document.querySelector(e) 
//let createElement = e => document.createElement(e) 

/**
 * Once a field is focused , the user should receive a message 
 *
*/
const firstName  = selector('#first-name') 
const lastName  = selector('#last-name') 
const email = selector('#email') 
const location = selector("#location")
const number  = selector('#number') 
/**
  *Focus and blur event on name input field  
*/

firstName.addEventListener("blur" , event => {
	const nameFeedBack = selector(".firstname-feedback")
	try {
		const nameValue = validateName(firstName.value.trim())
		if ( nameValue.value != null ) {
			nameFeedBack.textContent = "Good!"
	        nameFeedBack.classList.add("blur-feedback-success")
		}else {
			throw {
				name : "NameError " , 
				message : "Name should only be alphanumeric"
			}
		}
	}catch(error) {
		nameFeedBack.textContent = `${error.name} : ${error.message} `
		nameFeedBack.classList.add("blur-feedback-error")
	}
})

lastName.addEventListener("blur" , event => {
	const nameFeedBack = selector(".lastname-feedback")
	try {
		const nameValue = validateName(lastName.value.trim())
		if ( nameValue.value != null ) {
			nameFeedBack.textContent = "Good!"
	        nameFeedBack.classList.add("blur-feedback-success")
		}else {
			throw {
				name : "NameError " , 
				message : "Name should only be alphanumeric"
			}
		}
	}catch(error) {
		nameFeedBack.textContent = `${error.name} : ${error.message} `
		nameFeedBack.classList.add("blur-feedback-error")
	}
})
/**
 * Validate the email field 
 * Send get request to the server to see if the names are already taken 
  *
*/

email.addEventListener("blur" , event => {
	const emailFeedBack = selector(".email-feedback")
	try {
		const emailValue = validateEmail(email.value.trim())
		if ( emailValue.value != null ) {
			emailFeedBack.textContent = "Good!"
			emailFeedBack.classList.add("blur-feedback-success")
		}else {
			throw {
				name : "EmailError " , 
				message : "The email you provide is not valid"
			}
		}
	}catch(error) {
		emailFeedBack.textContent = `${error.name} : ${error.message} `
		emailFeedBack.classList.add("blur-feedback-error")
	}
})


/** 
 * Handling the submit event 
 */

selector("#submit").addEventListener("click" , event => {	
	const firstnameValue     = validateName(firstName.value.trim()).value
	const lastnameValue   = validateName(lastName.value.trim()).value 
	const emailValue     = validateEmail(email.value.trim()).value
	const numberValue = number.value.trim()
	const locationValue = location.value.trim()

	try {
		if ( firstnameValue != null && lastnameValue != null && emailValue != null && numberValue != null && locationValue != null) {

			const errorArea = selector(".on-submit")
			errorArea.textContent = "Good" 
			errorArea.classList.add("blur-feedback-success")
				
			//! Now use the fetch API to send the data to the server 
			let sendData = async () => {
				let userData = await fetch('http://localhost:3600/careers' , {
		                method : 'POST' , 
		                headers : {
			                'Content-Type' : 'application/x-www-form-urlencoded'
		                } , 
		                body : new FormData(selector('form'))
				})
				if ( userData ) {
					console.log(userData) 
				}else {
					console.log("Nothing go")
				}
			}
            }else {
			    throw {
				    name : "WrongFormValue" , 
					message : "Please , fill the fields correctly."
				}
				event.preventDefault()
			}
		}catch(error) {
	    const errorArea = selector(".on-submit")
		errorArea.textContent = error.message 
		errorArea.classList.add("blur-feedback-error")
		event.preventDefault()
	}
})