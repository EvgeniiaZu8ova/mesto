import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './constants.js';

// Задаём переменные
// Окна pop-up
const popupOverlays = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edition');
const popupAdd = document.querySelector('.popup_addition');

// Модальное окно для предпросмотра карточек, его текст и картинка
const popupPict = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupParagraph = document.querySelector('.popup__paragraph');

// Кнопки открытия и закрытия pop-up
const openButtonEdit = document.querySelector('.profile__button_edit');
const openButtonAdd = document.querySelector('.profile__button_add');
const closeButtonEdit = document.querySelector('.popup__close-icon_edit');
const closeButtonAdd = document.querySelector('.popup__close-icon_add');
const closeButtonPict = document.querySelector('.popup__close-icon_pic');

// Элементы форм отправки
const formElementEdit = document.querySelector('.popup__container_edition');
const formElementAdd = document.querySelector('.popup__container_addition');

// Заполняемые пользователем поля
const nameInput = document.querySelector('.popup__text_input_name');
const jobInput = document.querySelector('.popup__text_input_job');

// Переменные для работы с данными, введенными пользователем
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');
const placeElement = document.querySelector('.popup__text_input_place');
const linkElement = document.querySelector('.popup__text_input_link');

// Контейнер для карточек
const cardsContainer = document.querySelector('.elements');

// Массив с формами
const forms = document.querySelectorAll('.popup__container');

// Функция открытия формы
const openPopup = (popup) => {
  // добавляем элементу pop-up модификатор для вызова формы
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

// Функция закрытия формы
const closePopup = (popup) => {
  // удаляем модификатор отображения формы у элемента pop-up
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// Возможность закрыть модальное окно нажатием на Esc
const closePopupEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_opened'); 
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
};

// Обработчик для модального окна с предпросмотром карточек
const handleCardClick = (name, link) => {
  popupImage.src = link;
  popupParagraph.textContent = name;
  openPopup(popupPict);
};

// Функция считывания введённых пользователем данных в форму
const handleEditFormSubmit = (evt) => {
  // Отменяем автоматическое обновление страницы при отправке формы
  evt.preventDefault();
  // Заменяем данные на странице на информацию из формы ввода
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(popupEdit);
};

// Функция перебора массива с карточками
const renderCards = (data) => {
  data.forEach((item) => {
    const card = new Card(item, '.article', handleCardClick);
    const cardElement = card.generateCard();

    cardsContainer.prepend(cardElement);
  });
};

// Функция для валидации всех форм на странице
const validateForms = (forms) => {
  const formSettingsObject = {
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_visible'
  };

  forms.forEach((el) => {
    const form = new FormValidator(formSettingsObject, el);
    form.enableValidation();
    return form;
  })
};

// Добавляем слушатели
popupOverlays.forEach((el) => {
  el.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    };
  });
});

openButtonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

closeButtonEdit.addEventListener('click', function () {
  closePopup(popupEdit);
});

openButtonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
  formElementAdd.reset();
});

closeButtonAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

closeButtonPict.addEventListener('click', function() {
  closePopup(popupPict);
})

formElementEdit.addEventListener('submit', handleEditFormSubmit);

formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardInput = [
    {
      name: placeElement.value,
      link: linkElement.value
    }
  ];
    renderCards(cardInput);
    closePopup(popupAdd);
});

export { openPopup, closePopup };

validateForms(forms);
renderCards(initialCards.reverse());