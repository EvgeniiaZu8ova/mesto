// Массив с исходными карточками
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Окна pop-up
export const popupOverlays = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_edition');
export const popupAdd = document.querySelector('.popup_addition');

// Модальное окно для предпросмотра карточек, его текст и картинка
export const popupPict = document.querySelector('.popup_picture');
export const popupImage = document.querySelector('.popup__image');
export const popupParagraph = document.querySelector('.popup__paragraph');

// Кнопки открытия и закрытия pop-up
export const openButtonEdit = document.querySelector('.profile__button_edit');
export const openButtonAdd = document.querySelector('.profile__button_add');
export const closeButtonEdit = document.querySelector('.popup__close-icon_edit');
export const closeButtonAdd = document.querySelector('.popup__close-icon_add');
export const closeButtonPict = document.querySelector('.popup__close-icon_pic');
export const closeButtonPopup = document.querySelector('.popup__close-icon');

// Элементы форм отправки
export const formElementEdit = document.querySelector('.popup__container_edition');
export const formElementAdd = document.querySelector('.popup__container_addition');

// Заполняемые пользователем поля
export const nameInput = document.querySelector('.popup__text_input_name');
export const jobInput = document.querySelector('.popup__text_input_job');

// Переменные для работы с данными, введенными пользователем
export const nameElement = document.querySelector('.profile__title');
export const jobElement = document.querySelector('.profile__subtitle');
export const placeElement = document.querySelector('.popup__text_input_place');
export const linkElement = document.querySelector('.popup__text_input_link');

// Контейнер для карточек
export const cardsContainer = '.elements';

// Массив с формами
export const forms = document.querySelectorAll('.popup__container');