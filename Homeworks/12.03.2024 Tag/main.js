function Start() {
	let check = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	let arr = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

	function shuffle(array) {
		array.sort(() => Math.random() - 0.5)
	}

	shuffle(arr)

	let boxes = $('.box')
	let twoDimArr = []
	let index = 0
	for (let i = 0; i < 4; i++) {
		twoDimArr[i] = []
		for (let j = 0; j < 4; j++) {
			twoDimArr[i][j] = boxes[index++]
		}
	}

	let fBox
	let sBox
	let fClick = false
	function SelectedOFF() {
		let boxesWithClass = boxes.filter(function () {
			return $(this).hasClass('selected')
		})
		boxesWithClass.removeClass('selected')
	}
	let blackBox
	$('.box').click(function () {
		if (fClick) {
			sBox = $(this)
			if (fBox[0] == blackBox) {
				if (CheckIsPossible()) {
					fClick = false
					$(this).toggleClass('selected')
					$(this).toggleClass('black')
					let buffer = $(this).text()
					$(this).text(fBox.text())
					fBox.text(buffer)
					fBox.toggleClass('black')
					blackBox = sBox[0]
					SelectedOFF()
					CheckWin()
				}
			} else if (sBox[0] == blackBox) {
				if (CheckIsPossible()) {
					fClick = false
					$(this).toggleClass('selected')
					$(this).toggleClass('black')
					let buffer = $(this).text()
					$(this).text(fBox.text())
					fBox.text(buffer)
					fBox.toggleClass('black')
					blackBox = fBox[0]
					SelectedOFF()
					CheckWin()
				}
			} else {
				fClick = false
				fBox.toggleClass('selected')
			}
		} else {
			fClick = true
			fBox = $(this)
			$(this).toggleClass('selected')
		}
	})

	let boxIndex1
	let row1
	let col1

	for (let i = 0; i < boxes.length; i++) {
		boxes[i].innerText = arr[i]
		if (arr[i] == null) {
			blackBox = boxes[i]
			boxIndex1 = boxes.index(boxes[i])
			row1 = Math.floor(boxIndex1 / 4)
			col1 = boxIndex1 % 4
			boxes[i].classList.toggle('black')
		}
	}

	function CheckIsPossible() {
		let boxIndex1 = boxes.index(fBox)
		let row1 = Math.floor(boxIndex1 / 4)
		let col1 = boxIndex1 % 4

		let boxIndex2 = boxes.index(sBox)
		let row2 = Math.floor(boxIndex2 / 4)
		let col2 = boxIndex2 % 4

		if (row1 !== row2 && col1 !== col2) {
			return false
		} else {
			console.log(row1, col1)
			console.log(row2, col2)
			if (row1 == row2) {
				if (Math.pow(col1 - col2, 2) == 1) {
					return true
				} else {
					return false
				}
			} else if (col1 == col2) {
				if (Math.pow(row1 - row2, 2) == 1) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		}
	}

	function CheckWin() {
		for (let i = 1; i < boxes.length; i++) {
			if (boxes[i].innerText != check[i]) {
				if (boxes[i] != '') {
					return false
				}
			}
		}
		let isWin = confirm('WIN RESTART?')
		if (isWin) {
			Start()
		} else {
		}
	}
}
Start()
