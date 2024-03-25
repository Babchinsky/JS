// Создаем объект для хранения данных формы
let formData = {
	login: '',
	text_password1: '',
	text_password2: '',
	fullname: '',
	radio_gender: '',
	check_languages: [],
	list_work: '',
	e_mail: '',
	text_info: '',
}

function validateFormData(formData) {
	// Проверка наличия значения в строке
	function isEmpty(value) {
		return value.trim() === ''
	}

	// Проверка наличия цифр в строке
	function hasNumbers(value) {
		return /\d/.test(value)
	}

	// Проверка корректности email
	function isValidEmail(email) {
		// Простая проверка наличия @ и .
		return /\S+@\S+\.\S+/.test(email)
	}

	// Начало проверки данных
	if (
		isEmpty(formData.login) ||
		isEmpty(formData.text_password1) ||
		isEmpty(formData.text_password2) ||
		isEmpty(formData.fullname) ||
		isEmpty(formData.radio_gender) ||
		formData.check_languages.length === 0 ||
		isEmpty(formData.list_work) ||
		isEmpty(formData.e_mail) ||
		!isValidEmail(formData.e_mail) ||
		formData.text_password1 !== formData.text_password2 ||
		hasNumbers(formData.fullname)
	) {
		// Если какое-то условие не выполняется, данные некорректны
		return false
	}

	// Все проверки успешны, данные корректны
	return true
}

// Обработчики событий для обновления объекта при изменении формы
function updateFormData(fieldName, value) {
	formData[fieldName] = value
}

function addInputListener(fieldName) {
	document
		.querySelector(`input[name="${fieldName}"]`)
		.addEventListener('input', function () {
			updateFormData(fieldName, this.value)
		})
}

function addChangeRadioListener(fieldName) {
	document
		.querySelectorAll(`input[name="${fieldName}"]`)
		.forEach(function (radio) {
			radio.addEventListener('change', function () {
				updateFormData(fieldName, this.value)
			})
		})
}

function addChangeCheckboxListener(fieldName) {
	document
		.querySelectorAll(`input[name^="${fieldName}"]`)
		.forEach(function (checkbox) {
			checkbox.addEventListener('change', function () {
				updateCheckLanguages()
			})
		})
}

function updateCheckLanguages() {
	formData.check_languages = Array.from(
		document.querySelectorAll('input[name^="check_languages"]:checked')
	).map(function (checkedCheckbox) {
		return checkedCheckbox.nextSibling.nodeValue.trim()
	})
}

function addSelectChangeListeners(fieldName) {
	sel = document.getElementById(`${fieldName}`)

	sel.addEventListener('change', function () {
		updateFormData(fieldName, sel.options[sel.selectedIndex].text)
	})
}

function addTextAreaListener(fieldName) {
	document
		.querySelector(`textarea[name="${fieldName}"]`)
		.addEventListener('input', function () {
			updateFormData(fieldName, this.value)
		})
}

function addButtonListener(fieldName) {
	document.getElementById(fieldName).addEventListener('click', function () {
		if (validateFormData(formData)) {
			clearAllCookies()

			Object.keys(formData).forEach(function (key) {
				setCookie(key, formData[key], 365) // Куки будут храниться в течение 365 дней
			})
			console.log(document.cookie)
		} else {
			console.log(
				'Данные некорректны. Пароли должны совпадать, email должен быть правильно написан и все поля должны быть заполнены.'
			)
		}
	})
}

function clearAllCookies() {
	let cookies = document.cookie.split(';')

	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i]
		let eqPos = cookie.indexOf('=')
		let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
	}
}

// Функция для установки куки
function setCookie(name, value, days) {
	let expires = ''
	if (days) {
		let date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = '; expires=' + date.toUTCString()
	}
	document.cookie = name + '=' + value + expires + '; path=/'
}

// Функция для получения значения куки по её имени
function getCookie(name) {
	var nameEQ = name + '='
	var cookies = document.cookie.split(';')
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i]
		while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length)
		if (cookie.indexOf(nameEQ) === 0)
			return cookie.substring(nameEQ.length, cookie.length)
	}
	return null
}

// Добавляем обработчики для каждого поля
addInputListener('login')
addInputListener('text_password1')
addInputListener('text_password2')
addInputListener('fullname')
addChangeRadioListener('radio_gender')
addChangeCheckboxListener('check_languages')
addSelectChangeListeners('list_work')
addInputListener('e_mail')
addTextAreaListener('text_info')
addButtonListener('btnDone')

document.addEventListener('DOMContentLoaded', function () {
	// Заполнение объекта formData из куков
	formData.login = getCookie('login') || ''
	formData.text_password1 = getCookie('text_password1') || ''
	formData.text_password2 = getCookie('text_password2') || ''
	formData.fullname = getCookie('fullname') || ''
	formData.radio_gender = getCookie('radio_gender') || ''
	formData.check_languages = (getCookie('check_languages') || '').split(',')
	formData.list_work = getCookie('list_work') || ''
	formData.e_mail = getCookie('e_mail') || ''
	formData.text_info = getCookie('text_info') || ''

	// Теперь вы можете использовать formData с заполненными данными
	console.log(formData)

	// Заполнение полей формы значениями из formData
	document.getElementsByName('login')[0].value = formData.login
	document.getElementsByName('text_password1')[0].value =
		formData.text_password1
	document.getElementsByName('text_password2')[0].value =
		formData.text_password2
	document.getElementsByName('fullname')[0].value = formData.fullname
	let genderRadio = document.getElementsByName('radio_gender')
	for (let i = 0; i < genderRadio.length; i++) {
		if (genderRadio[i].value === formData.radio_gender) {
			genderRadio[i].checked = true
		}
	}
	document.getElementsByName('e_mail')[0].value = formData.e_mail
	document.getElementsByName('text_info')[0].value = formData.text_info
	document.getElementById('list_work').value = formData.list_work


	let languageCheckboxes = document.querySelectorAll(
		"input[name^='check_languages']"
	)
	for (let i = 0; i < languageCheckboxes.length; i++) {
		languageCheckboxes[i].checked = formData.check_languages.includes(
			languageCheckboxes[i].nextSibling.nodeValue.trim()
		)
	}
})
