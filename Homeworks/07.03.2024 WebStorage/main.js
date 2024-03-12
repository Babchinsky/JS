let formData = {
	email: '',
	password: '',
	confirmPassword: '',
	firstName: '',
	lastName: '',
	birthYear: '',
	gender: '',
	phoneNumber: '',
	skype: '',
}

// Во время ввода текст записывается в поля объекта formData и сразу же formData проверяется на валидность
function addInputListener(fieldName) {
	document.getElementById(fieldName).addEventListener('input', function () {
		updateFormData(fieldName, this.value)
		// console.log(formData)

		if (window.location.pathname.includes('signUp.html')) {
			if (!validateEmail(formData.email)) {
				displayError('email_error', 'Некорректный ввод почты')
			} else displayError('email_error', ' ')

			if (
				!validatePassword(formData.password) ||
				!validatePassword(formData.confirmPassword)
			) {
				displayError('password_error', 'Некорректный ввод пароля')
			} else displayError('password_error', ' ')

			if (formData.password !== formData.confirmPassword) {
				displayError('confirmPassword_error', 'Пароли не совпадают')
			} else displayError('confirmPassword_error', ' ')
		} else if (window.location.pathname.includes('profile.html')) {
			// Валидация First Name
			if (!validateName(formData.firstName)) {
				displayError('firstName_error', 'Некорректное имя')
			} else {
				displayError('firstName_error', ' ')
			}

			// Валидация Last Name
			if (!validateName(formData.lastName)) {
				displayError('lastName_error', 'Некорректная фамилия')
			} else {
				displayError('lastName_error', ' ')
			}

			// Валидация Year of Birth
			if (!validateBirthYear(formData.birthYear)) {
				displayError('year_error', 'Некорректный год рождения')
			} else {
				displayError('year_error', ' ')
			}

			// Валидация Phone Number
			if (!validatePhoneNumber(formData.phoneNumber)) {
				displayError('phone_error', 'Некорректный номер телефона')
			} else {
				displayError('phone_error', ' ')
			}

			// Валидация Skype
			if (!validateSkype(formData.skype)) {
				displayError('skype_error', 'Некорректный Skype')
			} else {
				displayError('skype_error', ' ')
			}
		}
	})
}

function displayLocalStorage() {
	// Получаем все ключи из localStorage
	const keys = Object.keys(localStorage)

	// Перебираем ключи и выводим их значения в консоль
	keys.forEach(key => {
		console.log(`${key}: ${localStorage.getItem(key)}`)
	})
}

function saveSignUpDataToLocalStorage() {
	// Получаем email из formData
	const email = formData.email

	// Создаем объект formData без вложенного email
	const userObject = {
		email: formData.email,
		password: formData.password,
		confirmPassword: formData.confirmPassword,
		firstName: formData.firstName,
		lastName: formData.lastName,
		birthYear: formData.birthYear,
		gender: formData.gender,
		phoneNumber: formData.phoneNumber,
		skype: formData.skype,
	}

	// Преобразуем объект в строку и сохраняем в localStorage
	localStorage.setItem(email, JSON.stringify(userObject))
}

function getFirstSignUpDataFromLocalStorage() {
	// Получаем ключ первого элемента в localStorage
	const firstKey = localStorage.key(0)

	// Проверяем, есть ли данные в localStorage
	if (firstKey !== null) {
		// Получаем сохраненную строку из localStorage по первому ключу
		const storedUserDataString = localStorage.getItem(firstKey)

		// Преобразуем строку обратно в объект
		const storedUserData = JSON.parse(storedUserDataString)

		// Создаем новый объект formData из сохраненных данных
		const formDataFromStorage = {
			email: storedUserData.email || '',
			password: storedUserData.password || '',
			confirmPassword: storedUserData.confirmPassword || '',
			firstName: storedUserData.firstName || '',
			lastName: storedUserData.lastName || '',
			birthYear: storedUserData.birthYear || '',
			gender: storedUserData.gender || '',
			phoneNumber: storedUserData.phoneNumber || '',
			skype: storedUserData.skype || '',
		}

		// Возвращаем полученный объект formData
		return formDataFromStorage
	} else {
		// Если данных нет, возвращаем пустой объект formData
		return {
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			birthYear: '',
			gender: '',
			phoneNumber: '',
			skype: '',
		}
	}
}

function validateEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
	return emailRegex.test(email)
}
function validatePassword(password) {
	// Минимум 6 символов, 1 буква в нижнем регистре, 1 буква в верхнем регистре, 1 цифра
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
	return passwordRegex.test(password)
}
function validateName(value) {
	const nameRegex = /^[a-zA-Z]+$/
	return value.length > 0 && value.length <= 20 && nameRegex.test(value)
}
function validateBirthYear(value) {
	const currentYear = new Date().getFullYear()
	return (
		value.length > 0 &&
		parseInt(value, 10) >= 1900 &&
		parseInt(value, 10) <= currentYear
	)
}
function validateGender(value) {
	return value.length > 0
}
function validatePhoneNumber(value) {
	const phoneRegex = /^\d{10,12}$/
	return phoneRegex.test(value)
}
function validateSkype(value) {
	return true
}

function updateFormData(fieldName, value) {
	formData[fieldName] = value
}

function displayError(fieldId, errorMessage) {
	document.getElementById(fieldId).textContent = errorMessage
}
