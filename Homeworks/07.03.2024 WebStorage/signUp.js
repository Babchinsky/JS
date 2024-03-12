addInputListener('email')
addInputListener('password')
addInputListener('confirmPassword')
addButtonListener('btnSignUp')

// Функция, которая будет выполнена при загрузке страницы
function onSignUpPageLoad() {
  displayLocalStorage()
  formData = getFirstSignUpDataFromLocalStorage()
	if (formData.email !== '') {    
    window.location.href = 'profile.html'
	}
}

// Добавляем обработчик события "DOMContentLoaded", чтобы выполнить код после полной загрузки DOM
document.addEventListener('DOMContentLoaded', onSignUpPageLoad)
