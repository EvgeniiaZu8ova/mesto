// Массив с исходными карточками
// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// Настройки для класса валидации
export const formSettingsObject = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
};

// Кнопки открытия pop-up
export const openButtonEdit = document.querySelector('.profile__button_edit');
export const openButtonAdd = document.querySelector('.profile__button_add');

// Иконка смены аватара пользователя
export const editAvatarButton = document.querySelector('.profile__avatar');

// Кнопки отправки данных
export const profileSubmitButton = document.querySelector('.popup__button_edition');
export const avatarSubmitButton = document.querySelector('.popup__button_change-avatar');
export const cardSubmitButton = document.querySelector('.popup__button_addition');

// Заполняемые пользователем поля
export const nameInput = document.querySelector('.popup__text_input_name');
export const jobInput = document.querySelector('.popup__text_input_job');

// Контейнер для карточек
export const cardsContainer = '.elements';

// Формы с валидацией
export const addFormElement = document.querySelector('.popup__container_addition');
export const editFormElement = document.querySelector('.popup__container_edition');
export const changeAvatarFormElement = document.querySelector('.popup__container_change-avatar');