/**
 * Require dependencies 
*/
import {validateName , validateNumber, validateEmail , validatePassword , verifyPassword } from "./validate.js" 

 //!Helper function for uniquely selecting DOM elements  
let selector = e => document.querySelector(e) 
//let createElement = e => document.createElement(e) 

/**
 * Once a field is focused , the user should receive a message 
 *
*/
const name  = selector('#name') 
const manager = selector('#manager') 
const applicants = selector('#applicants') 
const location = selector("#location")
const stack  = selector('#stack') 
const country = selector('#level')
/**
  *Focus and blur event on name input field  
*/

name.addEventListener("blur" , event => {
	const nameFeedBack = selector(".name-feedback")
	try {
		const nameValue = validateName(name.value.trim())
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
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("blur-feedback-error")
	}
})

manager.addEventListener("blur" , event => {
	const nameFeedBack = selector(".manager-feedback")
	try {
		const nameValue = validateName(manager.value.trim())
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
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("blur-feedback-error")
	}
})

applicants.addEventListener("blur" , event => {
	const nameFeedBack = selector(".applicant-feedback")
	try {
		const nameValue = validateNumber(applicants.value.trim())
		if ( nameValue.value != null ) {
			nameFeedBack.textContent = "Good!"
	        nameFeedBack.classList.add("blur-feedback-success")
		}else {
			throw {
				name : "NumberError " , 
				message : "Only digits, please."
			}
		}
	}catch(error) {
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("blur-feedback-error")
	}
})

location.addEventListener("blur" , event => {
	const nameFeedBack = selector(".location-feedback")
	try {
		const nameValue = validateName(location.value.trim())
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
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("blur-feedback-error")
	}
})


stack.addEventListener("blur" , event => {
	const nameFeedBack = selector(".number-feedback")
	try {
		const nameValue = validateNumber(stack.value.trim())
		if ( nameValue.value != null ) {
			nameFeedBack.textContent = "Good!"
	        nameFeedBack.classList.add("blur-feedback-success")
		}else {
			throw {
				name : "NameError " , 
				message : "Name should be alphanumeric"
			}
		}
	}catch(error) {
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("blur-feedback-error")
	}
})



/** 
 * Handling the submit event 
 */

selector("#submit").addEventListener("click" , event => {	
	const nameValue     = validateName(name.value.trim()).value
    const managerValue   = validateName(manager.value.trim()).value 
    const applicantsValue   = validateNumber(applicants.value.trim()).value 
    const locationValue     = validateName(location.value.trim()).value
    const stackValue     = validateName(stack.value.trim()).value

	try {
		if ( nameValue != null && managerValue != null && applicantsValue != null && locationValue != null && stackValue != null) {

			const errorArea = selector(".on-submit")
            errorArea.textContent = "Good!" 
            errorArea.classList.add("blur-feedback-success")
				
			//! Now use the fetch API to send the data to the server 
			let sendData = async () => {
				let userData = await fetch('http://localhost:3600/scc' , {
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