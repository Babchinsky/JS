'use strict'
$(document).ready(function () {
	$('#generateButton').click(function () {
		let length = $('#lengthInput').val()
		let includeDigits = $('#digitsCheckbox').is(':checked')
		let includeUpperCase = $('#upperCaseCheckbox').is(':checked')
		let includeLowerCase = $('#lowerCaseCheckbox').is(':checked')

    let charset = ''
		if (includeDigits) charset += '0123456789'
		if (includeUpperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		if (includeLowerCase) charset += 'abcdefghijklmnopqrstuvwxyz'

    let generatedString = ''
		for (let i = 0; i < length; i++) {
			let randomIndex = Math.floor(Math.random() * charset.length)
			generatedString += charset.charAt(randomIndex)
		}

		$('#generatedString').val(generatedString)
	})
})
