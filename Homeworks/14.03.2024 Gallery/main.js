$(document).ready(function () {
	$('.bigImg').attr('src', 'img/1.jpg')
	let smallImgs = $('.smallImg')
	for (let i = 0; i < smallImgs.length; i++) {
		smallImgs.eq(i).attr('src', `img/${i + 2}.jpg`)
	}
})
$(document).ready(function () {
	$('.bigImg').attr('src', 'img/1.jpg')
	let smallImgs = $('.smallImg')
	for (let i = 0; i < smallImgs.length; i++) {
		smallImgs.eq(i).attr('src', `img/${i + 2}.jpg`)
	}

	$('.bigImg')
		.on('mousemove', function (event) {
			var $this = $(this)
			var offset = $this.offset()
			var relX = event.pageX - offset.left
			var relY = event.pageY - offset.top
			var width = $this.width()
			var height = $this.height()
			var xPercent = (relX / width) * 100
			var yPercent = (relY / height) * 100

			var angleX = (xPercent - 50) / 5
			var angleY = (yPercent - 50) / 5

			$this.css(
				'transform',
				'perspective(1000px) rotateY(' +
					angleX +
					'deg) rotateX(' +
					-angleY +
					'deg) scale(1.1)'
			)
		})
		.on('mouseleave', function () {
			$(this).css('transform', 'none')
		})
	$('.smallImg')
		.on('mousemove', function (event) {
			var $this = $(this)
			var offset = $this.offset()
			var relX = event.pageX - offset.left
			var relY = event.pageY - offset.top
			var width = $this.width()
			var height = $this.height()
			var xPercent = (relX / width) * 100
			var yPercent = (relY / height) * 100

			var angleX = (xPercent - 50) / 5
			var angleY = (yPercent - 50) / 5

			$this.css(
				'transform',
				'perspective(1000px) rotateY(' +
					angleX +
					'deg) rotateX(' +
					-angleY +
					'deg) scale(1.1)'
			)
		})
		.on('mouseleave', function () {
			$(this).css('transform', 'none')
		})

	let isAnimated = false
	$('.smallImg').click(function () {
		if (!isAnimated) {
			isAnimated = true
			let $this = $(this)
			let rem = $this.attr('src')

			$('.bigImg').hide(20, function () {
				// Скрываем элемент
				$(this).attr('src', rem) // Замена src
				$(this).show(2000) // Показываем элемент с эффектом появления
			})
			setTimeout(() => {
				isAnimated = false
			}, 2000)
		}
	})

	$('.bigImg').click(function () {
		let $this = $(this)
		$(this).toggleClass('bigPic')
		$('.smallWrap').toggleClass('none')
		$('#bx').toggleClass('box')
	})
})
