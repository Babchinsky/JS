function SimpleMarker(redValue, greenValue, blueValue, inkPercentage) {
	this.redValue = redValue
	this.greenValue = greenValue
	this.blueValue = blueValue
	this.inkPercentage = inkPercentage

	this.setColor = function (redValue, greenValue, blueValue) {
		this.redValue = redValue
		this.greenValue = greenValue
		this.blueValue = blueValue
	}

	this.printText = function (text) {
		for (let char of text) {
			if (char !== ' ' && this.inkPercentage >= 0.5) {
				this.inkPercentage -= 0.5
			} else if (this.inkPercentage < 0.5) {
				alert('Нет чернил!')
				break
			}
			let selectedElement = document.createElement('span')

			selectedElement.style.color = `rgb(${this.redValue}, ${this.greenValue}, ${this.blueValue})`
			selectedElement.textContent = char
			document.getElementById('output').appendChild(selectedElement)
		}
		document.getElementById(
			'inkPercentage'
		).innerText = `${this.inkPercentage}% Ink`
	}
}

function RefillableMarker(redValue, greenValue, blueValue, inkPercentage) {
	SimpleMarker.call(this, redValue, greenValue, blueValue, inkPercentage)

	this.refillInk = function (amount) {
		if (this.inkPercentage + parseInt(amount, 10) <= 100) {
			this.inkPercentage += parseInt(amount, 10)
			document.getElementById(
				'inkPercentage'
			).innerText = `${this.inkPercentage}% Ink`
		} else {
			alert(
				'Неверная сумма пополнения. В маркере не может быть более 100% чернил.'
			)
		}
	}
}

function printText() {
	if (textInput.value.trim() === '') {
		alert('Введите текст')
		return
	}

	if (
		redInput.value.trim() === '' ||
		greenInput.value.trim() === '' ||
		blueInput.value.trim() === ''
	) {
		alert('Введите цвет')
		return
	}

	refillableMarker.setColor(redInput.value, greenInput.value, blueInput.value)
	refillableMarker.printText(textInput.value)
}

function refillInk() {
  refillableMarker.refillInk(inkInput.value);
}

function clearContent() {
	var outputContainer = document.getElementById('output')

	while (outputContainer.firstChild) {
		outputContainer.removeChild(outputContainer.firstChild)
	}
}

// Получаем ссылки на кнопки
let printButton = document.getElementById('printBtn')
let refillButton = document.getElementById('refillBtn')
let clearButton = document.getElementById('clearBtn')

let inkPercentage = document.getElementById('inkPercentage')
let textInput = document.getElementById('textInput')
let inkInput = document.getElementById('inkInput')

let redInput = document.getElementById('redInput')
let greenInput = document.getElementById('greenInput')
let blueInput = document.getElementById('blueInput')

printButton.addEventListener('click', printText)
refillButton.addEventListener('click', refillInk)
clearButton.addEventListener('click', clearContent)

const refillableMarker = new RefillableMarker(
	redInput.value,
	greenInput.value,
	blueInput.value,
	100
)
