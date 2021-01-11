// Задаём переменные
let popupEdit = document.querySelector('.popup_edition');
let popupAdd = document.querySelector('.popup_addition');

let openButtonEdit = document.querySelector('.profile__button_edit');
let openButtonAdd = document.querySelector('.profile__button_add');

let closeButtonEdit = document.querySelector('.popup__close-icon_edit');
let closeButtonAdd = document.querySelector('.popup__close-icon_add');

let formElement = document.querySelector('.popup__container');
let nameElement = document.querySelector('.profile__title');
let jobElement = document.querySelector('.profile__subtitle');
let placeElement = document.querySelector('.article__name');
let linkElement = document.querySelector('.article__image');

let nameInput = document.querySelector('.popup__text_input_name');
let jobInput = document.querySelector('.popup__text_input_job');
let placeInput = document.querySelector('.popup__text_input_place');
let linkInput = document.querySelector('.popup__text_input_link');

// Функция открытия формы
function openPopup(popup) {
  // добавляем элементу pop-up модификатор для вызова формы
  popup.classList.add('popup_opened');
  // отображаем имеющиеся данные в полях ввода
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  placeInput.value = 'Название';
  linkInput.value = 'Ссылка на картинку';
}

// Функция закрытия формы
function closePopup(popup) {
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
openButtonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
});
openButtonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
});

closeButtonEdit.addEventListener('click', function () {
  closePopup(popupEdit);
});
closeButtonAdd.addEventListener('click', function () {
  closePopup(popupAdd);
})

formElement.addEventListener('submit', handleFormSubmit);