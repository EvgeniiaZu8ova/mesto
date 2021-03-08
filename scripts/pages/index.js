// Импорт компонентов и констант
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, openButtonEdit, openButtonAdd, nameInput, 
        jobInput, cardsContainer, forms } from '../utils/constants.js';

// Создание секции с карточками
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.article', () => {
      const popupImage = new PopupWithImage('.popup_picture', item.name, item.link);
      popupImage.open();
      popupImage.setEventListeners();
    });
    const cardElement = card.generateCard();
    
    cardList.addItem(cardElement);
    }
  }, cardsContainer
);


// Создание модального окна с формой для добавления новых карточек
const popupWithAdd = new PopupWithForm(
  '.popup_addition',
  (item) => {
    const card = new Card(item, '.article', () => {
      const popupImage = new PopupWithImage('.popup_picture', item.name, item.link);
      popupImage.open();
      popupImage.setEventListeners();
    });

    const cardElement = card.generateCard();
    
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


// Добавление обработчиков кнопкам открытия модальных окон
openButtonAdd.addEventListener('click', () => {
  popupWithAdd.open();
});

openButtonEdit.addEventListener('click', () => {
  popupWithEdit.open();
  nameInput.value = userInfo.getUserInfo().userName;
  jobInput.value = userInfo.getUserInfo().userJob;
});


// Валидация всех форм на странице
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

validateForms(forms);
