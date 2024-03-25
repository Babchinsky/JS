document.addEventListener('DOMContentLoaded', function () {
	const thumbnails = document.querySelectorAll('.thumbnails img')

	thumbnails.forEach(thumbnail => {
		thumbnail.addEventListener('click', function () {
			const enlargedSrc = this.dataset.src
			const img = new Image() // Создаем временный элемент изображения
			img.src = enlargedSrc // Устанавливаем источник изображения для загрузки

			img.onload = function () {
					openEnlargedImage(enlargedSrc, img.width, img.height) // Открываем окно
			}
		})
	})

	function openEnlargedImage(src, width, height) {
		const left = (window.innerWidth - width) / 2 // Расположение по горизонтали
		const top = (window.innerHeight - height) / 2 // Расположение по вертикали

		const options = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
		window.open(src, 'enlarged_image', options)
	}
})
