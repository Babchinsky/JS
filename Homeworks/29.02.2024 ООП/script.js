function updateExtendedDate() {
	const inputDate = document.getElementById('inputDate').value
	const extendedDate = new ExtendedDate(inputDate)

	// Вызываем методы и выводим результаты
	const outputDiv = document.getElementById('output')
	outputDiv.innerHTML = `
        <p>Дата: ${extendedDate.printDate()}</p>
        <p>Это ${
					extendedDate.isFutureDate() ? 'будущая или текущая' : 'прошедшая'
				} дата.</p>
        <p>Это ${
					extendedDate.isLeapYear() ? 'високосный' : 'невисокосный'
				} год.</p>
        <p>Следующая дата: ${extendedDate
					.getNextDate()
					.toLocaleDateString()}</p>
    `
}

document
	.getElementById('updateDateBtn')
	.addEventListener('click', updateExtendedDate)
