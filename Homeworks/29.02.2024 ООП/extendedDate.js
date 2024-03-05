class ExtendedDate extends Date {
	constructor(dateString) {
		super(dateString)
	}

	printDate() {
		const months = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		]

		const day = this.getDate()
		const month = months[this.getMonth()]
		return `${day} ${month}`
	}

	
	isFutureDate() {
		const currentDate = new Date()
		currentDate.setHours(0, 0, 0, 0) // Устанавливаем время в 00:00:00 для текущей даты
		const inputDate = new Date(
			this.getFullYear(),
			this.getMonth(),
			this.getDate()
		)
		return inputDate.getTime() >= currentDate.getTime()
	}

	isLeapYear() {
		const year = this.getFullYear()
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
	}

	getNextDate() {
		const nextDate = new Date(this.getTime())
		nextDate.setDate(nextDate.getDate() + 1)
		return new ExtendedDate(nextDate)
	}
}
