let isDragging = false
let isLeft = false

$('#right-sep, #left-sep').on('mousedown', function (e) {
	isDragging = true
	isLeft = e.target.id === 'left-sep'
})

$('body')
	.on('mousemove', function (e) {
		if (isDragging) {
			let container = isLeft ? $('#left') : $('#right')
			let containerTop = container.offset().top
			let containerHeight = container.height()
			let mouseY = e.pageY - containerTop
			mouseY = Math.max(0, Math.min(mouseY, containerHeight))

			if (isLeft) {
				$('#A').height(mouseY)
				$('#B').height(containerHeight - mouseY)
			} else {
				$('#C').height(mouseY)
				$('#D').height(containerHeight - mouseY)
			}
		}
	})
	.on('mouseup', function () {
		isDragging = false
	})

let isWrap = false

$('#arrow').on('click', function () {
	let $left = $('#left')
	if (isWrap) {
		$left.css('flex-basis', '250px')
		$(this).text('◀')
	} else {
		$left.css('flex-basis', '0px')
		$(this).text('▶')
	}
	isWrap = !isWrap
})
