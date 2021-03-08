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

// Кнопки открытия pop-up
export const openButtonEdit = document.querySelector('.profile__button_edit');
export const openButtonAdd = document.querySelector('.profile__button_add');

// Заполняемые пользователем поля
export const nameInput = document.querySelector('.popup__text_input_name');
export const jobInput = document.querySelector('.popup__text_input_job');

// Контейнер для карточек
export const cardsContainer = '.elements';

// Массив с формами
export const forms = document.querySelectorAll('.popup__container');