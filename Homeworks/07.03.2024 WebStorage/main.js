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
		skype: formData.skype
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

// Валидация почтового адреса
function validateEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
	return emailRegex.test(email)
}

// Валидация пароля
function validatePassword(password) {
	// Минимум 6 символов, 1 буква в нижнем регистре, 1 буква в верхнем регистре, 1 цифра
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
	return passwordRegex.test(password)
}

// Обработчики событий для обновления объекта при изменении формы
function updateFormData(fieldName, value) {
	formData[fieldName] = value
}

function addInputListener(fieldName) {
	document.getElementById(fieldName).addEventListener('input', function () {
		updateFormData(fieldName, this.value)
	})
}

function addButtonListener(fieldName) {
	document.getElementById(fieldName).addEventListener('click', function () {
		// Добавьте здесь проверку на совпадение паролей
		if (
			formData.password === formData.confirmPassword &&
			validateEmail(formData.email) &&
			validatePassword(formData.password)
		) {
			saveSignUpDataToLocalStorage()
			window.location.href = 'profile.html'
		} else if (formData.password !== formData.confirmPassword) {
			alert('Passwords do not match')
		} else if (validateEmail(formData.e_mail) === false) {
			alert('Email incorrect input')
		} else if (validatePassword(formData.password) === false) {
			alert('Password incorrect input')
		}
	})
}
