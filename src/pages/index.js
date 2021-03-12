// Импорт стилей
import './index.css';

// Импорт компонентов и констант
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, formSettingsObject, openButtonEdit, openButtonAdd, nameInput, 
        jobInput, cardsContainer, addFormElement, editFormElement } from '../utils/constants.js';

// Создание экземпляра модального окна с картинкой
const popupWithImage = new PopupWithImage('.popup_picture');
popupWithImage.setEventListeners();

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, '.article', () => {
    popupWithImage.open(item.link, item.name);
  });

  return card.generateCard();
};

// Создание секции с карточками
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);    
    cardList.addItem(cardElement);
  }
}, cardsContainer
);

// Создание модального окна с формой для добавления новых карточек
const popupWithAdd = new PopupWithForm(
  '.popup_addition',
  (item) => {
    const cardElement = createCard(item);    
    cardList.addItem(cardElement);
  }
);

popupWithAdd.setEventListeners();


// Создание объекта, ответственного за отображение данных пользователя на странице
const userInfo = new UserInfo({
  nameElement: '.profile__title',
  jobElement: '.profile__subtitle'
});


// Создание модального окна с формой для обновления данных пользователя
const popupWithEdit = new PopupWithForm(
  '.popup_edition',
  (item) => {
    userInfo.setUserInfo(item);
  }
);

popupWithEdit.setEventListeners();


// Отрисовка карточек
cardList.renderItems();

// Создание экземпляров класса валидации
const addCardValidator = new FormValidator(formSettingsObject, addFormElement); 
addCardValidator.enableValidation();

const editInfoValidator = new FormValidator(formSettingsObject, editFormElement);
editInfoValidator.enableValidation();

// Добавление обработчиков кнопкам открытия модальных окон
openButtonAdd.addEventListener('click', () => {
  addCardValidator.toggleButtonState();
  popupWithAdd.open();
});

openButtonEdit.addEventListener('click', () => {
  popupWithEdit.open();
  nameInput.value = userInfo.getUserInfo().userName;
  jobInput.value = userInfo.getUserInfo().userJob;
});
