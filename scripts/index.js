// Задаём переменные
let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__button_edit');
let closeButton = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__container');
let nameElement = document.querySelector('.profile__title');
let jobElement = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__text_input_name');
let jobInput = document.querySelector('.popup__text_input_job');

// Функция открытия формы редактирования профиля
function openPopup() {
  // добавляем элементу pop-up модификатор для вызова формы
  popup.classList.add('popup_opened');
  // отображаем имеющиеся данные в полях ввода
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

// Функция закрытия формы редактирования профиля
function closePopup() {
  // удаляем модификатор отображения формы у элемента pop-up
  popup.classList.remove('popup_opened');
}

// Функция считывания введённых пользователем данных в форму
function handleFormSubmit (evt) {
  // Отменяем автоматическое обновление страницы при отправке формы
  evt.preventDefault();
  // Заменяем данные на странице на информацию из формы ввода
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup();
}

// Добавляем слушатели
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);