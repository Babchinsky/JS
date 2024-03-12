// Функция для валидации имени и фамилии
function validateName(value) {
	const nameRegex = /^[a-zA-Z]+$/
	return value.length > 0 && value.length <= 20 && nameRegex.test(value)
}

// Функция для валидации года рождения
function validateBirthYear(value) {
	const currentYear = new Date().getFullYear()
	return (
		value.length > 0 &&
		parseInt(value, 10) >= 1900 &&
		parseInt(value, 10) <= currentYear
	)
}

// Функция для валидации пола
function validateGender(value) {
	return value.length > 0
}

// Функция для валидации номера телефона
function validatePhoneNumber(value) {
	const phoneRegex = /^\d{10,12}$/
	return phoneRegex.test(value)
}

// Функция для валидации Skype
function validateSkype(value) {
	return true
}

// Функция, которая будет выполнена при загрузке страницы
function onPageLoad() {
	// Ваш код для выполнения действий при открытии страницы profile.html
	displayLocalStorage()
	formData = getFirstSignUpDataFromLocalStorage()
	document.getElementById('email_strong').textContent = formData.email

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
	}

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
	// Валидация имени
	const firstName = document.getElementById('firstName').value
	if (!validateName(firstName)) {
		alert('Invalid first name. Only letters allowed, maximum length is 20.')
		return
	}
	formData.firstName = firstName

	// Валидация фамилии
	const lastName = document.getElementById('lastName').value
	if (!validateName(lastName)) {
		alert('Invalid last name. Only letters allowed, maximum length is 20.')
		return
	}
	formData.lastName = lastName

	// Валидация года рождения
	const birthYear = document.getElementById('birthYear').value
	if (!validateBirthYear(birthYear)) {
		alert('Invalid birth year. Must be between 1900 and the current year.')
		return
	}
	formData.birthYear = birthYear

	// Валидация пола
	const gender = document.getElementById('gender').value
	if (!validateGender(gender)) {
		alert('Gender is a required field.')
		return
	}
	formData.gender = gender

	// Валидация номера телефона
	const phoneNumber = document.getElementById('phoneNumber').value
	if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
		alert('Invalid phone number. Must contain 10 to 12 digits.')
		return
	}
	formData.phoneNumber = phoneNumber

	// Валидация Skype
	const skype = document.getElementById('skype').value
	if (skype && !validateSkype(skype)) {
		alert('Invalid Skype username.')
		return
	}
	formData.skype = skype

	// Если все данные введены корректно, можно продолжить обработку или сохранение
	// вашего объекта formData
	console.log('All data is valid. Proceed with further processing.')
	console.log('FormData:', formData)
	saveSignUpDataToLocalStorage()
	displayLocalStorage()
}

// Функция для отображения ошибки
function displayError(fieldId, errorMessage) {
	alert(errorMessage)
}

// Функция для сброса ошибок перед новой валидацией
function resetErrors() {}

function clearProfile() {
	localStorage.clear()
	// window.location.href = 'signUp.js'
}

// Добавляем обработчик события "DOMContentLoaded", чтобы выполнить код после полной загрузки DOM
document.addEventListener('DOMContentLoaded', onPageLoad)

document.getElementById('exit_a').addEventListener('click', clearProfile)
document.getElementById('save_btn').addEventListener('click', saveProfile)
