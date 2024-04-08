$(function(){
    // переменная для хранения интервала таймера и массив открытых карт
    let timer, openedCards = [], imgstr = [], isGame = false; 
    // Функция для запуска таймера
    function startTimer() {
        let seconds = 0;
        timer = setInterval(function() {
            seconds++;
            let minutes = Math.floor(seconds / 60);
            let remainderSeconds = seconds % 60;
            $('.time').text((minutes < 10 ? '0' : '') + minutes + ':' + (remainderSeconds < 10 ? '0' : '') + remainderSeconds);
        }, 1000);
    }
    // Инициализация игры
    function initGame(){
        $('.image').css('background-image', 'url(textures/background.png)') // Добавляем фон карточкам
        startTimer(); // Запускаем таймер
        isGame = true; // Разрешаем нажимать карты
        // Заполняем массив
        for (let i = 1; i <= 5; i++) {
            for (let j = 0; j < 2; j++) imgstr.push('textures/' + i + '.jpg');
        }
        shuffleArray(imgstr); // Перемешиваем массив
    }
    // Функция для перемешивания массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    // Функция проверки и констатации выигрыша
    function checkWin() {
        var allMatched = $('.image').toArray().every(function(element) {
            return $(element).hasClass('matched');
        });
        if (allMatched) {
            isGame = false;
            clearInterval(timer);
            $('.polotno').css('visibility', 'visible');
            $('.polotno').css('animation', 'appear .3s linear forwards');
            $('.but').val('Начать заново');
        }
    }
    // Обработчик для кнопки
    $('.but').click(function() {
        if ($(this).val() === 'Начать') {
            initGame();
            $(this).val('Закончить');
        } else if ($(this).val() === 'Закончить') {
            $('.image').each(function(index) {
                clearInterval(timer);
                $(this).css('background-image', 'url(' + imgstr[index] + ')');
                $(this).effect("fade", {}, 150);
                isGame = false;
            });
            $(this).val('Начать заново');
        } else location.reload();
    });
    // Обработка клика по карте
    $('.image').on('click', function () {
        if (openedCards.length < 2 && !$(this).hasClass('matched') && isGame) {
            openedCards.push($(this));
            let index = $('.image').index(this);
            $(this).css('background-image', 'url(' + imgstr[index] + ')');
            $(this).effect("fade", {}, 150);
            if (openedCards.length === 2) {
                var card1Index = $('.image').index(openedCards[0]);
                var card2Index = $('.image').index(openedCards[1]);
                if (imgstr[card1Index] !== imgstr[card2Index]) {
                    setTimeout(function () {
                        openedCards.forEach(function (card) {
                            card.css('background-image', 'url(textures/background.png)');
                            openedCards = [];
                        });
                    }, 750);
                } else {
                    openedCards.forEach(function (card) {
                        card.addClass('matched');
                        openedCards = [];
                    });
                }
            }
            checkWin();
        }
    });
});