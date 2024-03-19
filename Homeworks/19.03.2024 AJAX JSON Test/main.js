'use strict'
let currentQuestionIndex = 0 
let correctAnswers = 0 
let questionsData // Переменная для хранения данных вопросов

// Функция для загрузки вопросов из JSON-файла
function loadQuestions(callback) {
	let xhr = new XMLHttpRequest()
	xhr.overrideMimeType('application/json') // Установка MIME-типа для ответа
	xhr.open('GET', 'questions.json', true) // Открытие соединения для GET-запроса к файлу questions.json

	// Функция, которая будет вызываться при изменении состояния запроса
	xhr.onreadystatechange = function () {
		// Проверка, что запрос завершён и статус ответа успешный
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback(xhr.responseText) // Вызов переданной функции обратного вызова с ответом
		}
	}
	xhr.send(null) // Отправка запроса (в данном случае - без тела)
}

function displayQuestion(questionObj) {
	let questionContainer = document.getElementById('question-container') 
	let optionsContainer = document.getElementById('options-container') 
	questionContainer.innerHTML = '<p>' + questionObj.question + '</p>' 

	optionsContainer.innerHTML = '' 

	questionObj.options.forEach(function (option, optionIndex) {
		// Перебор всех вариантов ответов
		let input = document.createElement('input') 
		input.type = 'checkbox' 
		input.id = 'option' + optionIndex 
		input.name = 'options' // Установка имени (для группировки)
		input.value = option // Установка значения
		let label = document.createElement('label') 
		label.htmlFor = 'option' + optionIndex 
		label.appendChild(document.createTextNode(option)) 

		optionsContainer.appendChild(input) 
		optionsContainer.appendChild(label)
		optionsContainer.appendChild(document.createElement('br')) 
	})
}

function showResult() {
	document.getElementById('question-container').remove()
	document.getElementById('options-container').remove()
	document.getElementById('submit-btn').remove()

	document.getElementById('result').textContent =
		'Результат: ' + correctAnswers + ' из ' + questionsData.questions.length // Вывод результатов
}

function submitAnswer() {
	// Получение выбранных вариантов ответов
	let selectedOptions = document.querySelectorAll(
		'input[name="options"]:checked'
	)

	// Преобразование выбранных значений в массив
	let selectedValues = Array.from(selectedOptions).map(function (option) {
		return option.value
	})

	let currentQuestion = questionsData.questions[currentQuestionIndex] 
	let correctAnswersForCurrentQuestion = currentQuestion.correct_answers 

	let isCorrect = correctAnswersForCurrentQuestion.every(function (
		correctAnswer
	) {
		// Проверка, что все правильные ответы выбраны
		return selectedValues.includes(correctAnswer)
	})

	if (isCorrect) correctAnswers++

	currentQuestionIndex++ 

	if (currentQuestionIndex < questionsData.questions.length) {
		displayQuestion(questionsData.questions[currentQuestionIndex]) 
	} else {
		showResult()
	}
}

// Функция, вызываемая при загрузке страницы
window.onload = function () {
	loadQuestions(function (questions) {
		// Загрузка вопросов
		questionsData = JSON.parse(questions) // Преобразование ответа в формате JSON в объект JavaScript
		displayQuestion(questionsData.questions[currentQuestionIndex]) // Отображение первого вопроса
	})

	document.getElementById('submit-btn').addEventListener('click', submitAnswer) 
}
