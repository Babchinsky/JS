function addSelectListener(fieldName) {
	document.getElementById(fieldName).addEventListener('change', function () {
		updateFormData(fieldName, this.value)
		// console.log(formData)
	})
}


function onPageLoad() {
	formData = getFirstSignUpDataFromLocalStorage()
	document.getElementById('email_strong').textContent = formData.email

	// Проверка, есть ли поля
	if (formData.firstName) {
		document.getElementById('firstName').value = formData.firstName
	}
	if (formData.lastName) {
		document.getElementById('lastName').value = formData.lastName
	}
	if (formData.birthYear) {
		document.getElementById('birthYear').value = formData.birthYear
	}
	if (formData.gender) {
		document.getElementById('gender').value = formData.gender
	} else formData.gender = 'male'
	if (formData.phoneNumber) {
		document.getElementById('phoneNumber').value = formData.phoneNumber
	}
	if (formData.skype) {
		document.getElementById('skype').value = formData.skype
	}
	displayLocalStorage()
	console.log(formData)
}

function saveProfile() {
	if (
		validateName(formData.firstName) &&
		validateName(formData.lastName) &&
		validateBirthYear(formData.birthYear) &&
		validateGender(formData.gender) &&
		validatePhoneNumber(formData.phoneNumber) &&
		validateSkype(formData.skype)
	) {
		saveSignUpDataToLocalStorage()
		displayLocalStorage()
	}
}
function clearProfile() {
	localStorage.clear()
}

addInputListener('firstName')
addInputListener('lastName')
addInputListener('birthYear')
addInputListener('phoneNumber')
addInputListener('skype')
addSelectListener('gender')

document.addEventListener('DOMContentLoaded', onPageLoad)
document.getElementById('exit_a').addEventListener('click', clearProfile)
document.getElementById('save_btn').addEventListener('click', saveProfile)
