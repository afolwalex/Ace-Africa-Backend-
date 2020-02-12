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
const name  = selector('#name') 
const email = selector('#email') 
const password  = selector('#password') 
/**
  *Focus and blur event on name input field  
*/

name.addEventListener("blur" , event => {
	const nameFeedBack = selector(".name-feedback")
	try {
		const nameValue = validateName(name.value.trim())
		if ( nameValue.value != null ) {
            nameFeedBack.classList.remove("blur-feedback-error")
			nameFeedBack.textContent = "Good!"
	        nameFeedBack.classList.add("blur-feedback-success")
		}else {
			throw {
				name : "NameError " , 
				message : "Name should only be alphanumeric"
			}
		}
	}catch(error) {
		nameFeedBack.textContent = error.message
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

password.addEventListener("blur" , event => {
	const passwordFeedBack = selector(".password-feedback")
	const passwordValue = validatePassword(password.value.trim())
	console.log(passwordValue.value , passwordValue.name)
	try {
		if ( passwordValue.value) {
			passwordFeedBack.textContent = "Good"
		}else {
			throw {
				name : "PasswordError " , 
				message : "Provide must be atleast 8 characters long and mixed case"
			}
		}
	}catch(error) {
		passwordFeedBack.textContent = error.message
		passwordFeedBack.classList.add("blur-feedback-error")
	}
})


/** 
 * Handling the submit event 
 */

selector("#submit").addEventListener("click" , event => {	
	const nameValue     = validateName(name.value.trim()).value
    const emailValue   = validateEmail(email.value.trim()).value 
    const passwordValue   = validatePassword(password.value.trim()).value 

	try {
		if ( nameValue != null && emailValue != null && passwordValue != null) {

			const errorArea = selector(".on-submit")
            errorArea.textContent = "Good!" 
            errorArea.classList.add("blur-feedback-success")
				
			//! Now use the fetch API to send the data to the server 
			let sendData = async () => {
				let userData = await fetch('http://localhost:3600/digital-skills' , {
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
					message : "Please , fill the fields correctly"
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