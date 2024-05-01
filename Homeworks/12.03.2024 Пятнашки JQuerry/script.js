$(document).ready(function () {
	const changeThemeButton = $('#changeTheme')
	// Проверяем, сохранена ли тема в localStorage
	if (localStorage.getItem('theme') === 'dark') {
		$('body').addClass('darkTheme') // Применяем темную тему
	}

	changeThemeButton.click(function () {
		toggleTheme()
	})

	function toggleTheme() {
		$('body').toggleClass('darkTheme')
		// Сохраняем текущую тему в localStorage
		if ($('body').hasClass('darkTheme')) {
			localStorage.setItem('theme', 'dark')
		} else {
			localStorage.setItem('theme', 'light')
		}
	}

	let empty
	let board
	let moves = $('#moves')

	function fetchData(array) {
		let cont = $('#cnt')
		cont.html('') // Очищаем содержимое контейнера

		if (array === undefined)
			board = shuffleArray([
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,
			])
		// board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];
		let x = 0
		let y = 0

		// Проходимся по каждому элементу массива board и добавляем его в контейнер
		board.forEach((number, index) => {
			// Создаем новый элемент с классом "block" и текстом, равным текущему числу
			let block = $('<div>')
			block.css('left', x)
			block.css('top', y)
			if (number === 0) {
				block.addClass('emptyBlock').text('')
				empty = block
			} else {
				block
					.addClass('block')
					.text(number)
					.click(function () {
						move($(this))
					})
			}

			// Добавляем созданный блок внутрь контейнера
			cont.append(block)

			// Увеличиваем значение x на ширину блока
			x += block.width()

			// Если достигнут конец строки, переходим на следующую строку
			if ((index + 1) % 4 === 0) {
				x = 0
				y += block.height()
			}
		})
	}
	fetchData()

	function shuffleArray(array) {
		// Создаем копию массива, чтобы не менять оригинальный массив
		let shuffledArray = array.slice()

		// Проходимся по каждому элементу массива, начиная с последнего
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			// Генерируем случайный индекс от 0 до i
			const j = Math.floor(Math.random() * (i + 1))

			// Обмениваем значения между элементами с индексами i и j
			;[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i],
			]
		}

		// Возвращаем перемешанный массив
		return shuffledArray
	}

	function canMove(number) {
		const jump = 4
		const currentIndex = board.indexOf(number)
		// $("#test2").text("Index: " + currentIndex);

		if (currentIndex % 4 !== 0 && board[currentIndex - 1] === 0) {
			return { index: currentIndex - 1, direction: 'left' }
		} else if ((currentIndex + 1) % 4 !== 0 && board[currentIndex + 1] === 0) {
			return { index: currentIndex + 1, direction: 'right' }
		} else if (currentIndex >= jump && board[currentIndex - jump] === 0) {
			return { index: currentIndex - jump, direction: 'up' }
		} else if (
			currentIndex < board.length - jump &&
			board[currentIndex + jump] === 0
		) {
			return { index: currentIndex + jump, direction: 'down' }
		}
		return { index: -1, direction: '' }
	}

	function move(clickedBlock) {
		let number = +clickedBlock.text()
		// $("#test").text("Number: " +number);
		let result = canMove(number)
		if (result.index !== -1) {
			moveBlock(board.indexOf(number), result.index)
			moves.text(+moves.text() + 1)
		}
		if (checkWin()) {
			alert('YOU WIN')
		}
	}

	function checkWin() {
		// Ожидаемая последовательность чисел
		let expectedSequence = [...Array(15).keys()].map(i => i + 1)

		// Добавляем 0 в конец, чтобы учесть пустой блок
		expectedSequence.push(0)

		// Проверяем, совпадает ли массив board с ожидаемой последовательностью
		for (let i = 0; i < board.length; i++) {
			if (board[i] !== expectedSequence[i]) {
				return false
			}
		}

		return true
	}
	function moveBlock(index1, index2) {
		// Поменять местами значения в массиве
		;[board[index1], board[index2]] = [board[index2], board[index1]]

		// Обновить интерфейс
		fetchData(board)
	}
})
