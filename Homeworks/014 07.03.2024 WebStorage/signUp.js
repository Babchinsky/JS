function addButtonListener(fieldName) {
	document.getElementById(fieldName).addEventListener('click', function () {
		if (
			formData.password === formData.confirmPassword &&
			validateEmail(formData.email) &&
			validatePassword(formData.password)
		) {
			saveSignUpDataToLocalStorage()
			window.location.href = 'profile.html'
		}
	})
}

function onSignUpPageLoad() {
	displayLocalStorage()
	formData = getFirstSignUpDataFromLocalStorage()
	if (formData.email !== '') {
		window.location.href = 'profile.html'
	}
}


document.addEventListener('DOMContentLoaded', onSignUpPageLoad)

addInputListener('email')
addInputListener('password')
addInputListener('confirmPassword')
addButtonListener('btnSignUp')