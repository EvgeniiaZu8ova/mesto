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

// Функция открытия формы редактирования профиля
function openPopupEdit() {
  // добавляем элементу pop-up модификатор для вызова формы
  popupEdit.classList.add('popup_opened');
  // отображаем имеющиеся данные в полях ввода
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

// Функция открытия формы добавления карточек
function openPopupAdd() {
  // добавляем элементу pop-up модификатор для вызова формы
  popupAdd.classList.add('popup_opened');
  // отображаем имеющиеся данные в полях ввода
  placeInput.value = 'Название';
  linkInput.value = 'Ссылка на картинку';
}

// Функция закрытия формы редактирования профиля
function closePopupEdit() {
  // удаляем модификатор отображения формы у элемента pop-up
  popupEdit.classList.remove('popup_opened');
}

// Функция закрытия формы добавления карточек
function closePopupAdd() {
  // удаляем модификатор отображения формы у элемента pop-up
  popupAdd.classList.remove('popup_opened');
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
openButtonEdit.addEventListener('click', openPopupEdit);
openButtonAdd.addEventListener('click', openPopupAdd);

closeButtonEdit.addEventListener('click', closePopupEdit);
closeButtonAdd.addEventListener('click', closePopupAdd);

formElement.addEventListener('submit', handleFormSubmit);