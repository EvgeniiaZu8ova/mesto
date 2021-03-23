// Импорт стилей
import './index.css';

// Импорт компонентов и констант
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { formSettingsObject, openButtonEdit, openButtonAdd, editAvatarButton, profileSubmitButton, 
        avatarSubmitButton, cardSubmitButton, nameInput, jobInput, cardsContainer, addFormElement, 
        editFormElement, changeAvatarFormElement } from '../utils/constants.js';

// Объект настроек для экземпляра класса Api
const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'b75b73b9-d862-4271-a664-b5dd34a2f2e6',
    'Content-Type': 'application/json'
  }
};

// Создание экземпляра класса Api
const api = new Api(options);

// Создание объекта, ответственного за отображение данных пользователя на странице
const userInfo = new UserInfo({
  nameElement: '.profile__title',
  jobElement: '.profile__subtitle',
  avatarElement: '.profile__photo'
}, api);

// Запрос на сервер данных пользователя
userInfo.loadUserInfo();

// Создание модального окна с формой для обновления данных пользователя
const popupWithEdit = new PopupWithForm(
  '.popup_edition',
  (item) => {
    userInfo.setUserInfo(item);
    profileSubmitButton.textContent = 'Сохранение...';
  }
);

popupWithEdit.setEventListeners();

// Создание модального окна с формой для обновления аватара пользователя
const popupForUserAvatar = new PopupWithForm(
  '.popup_change-avatar',
  (item) => {
    userInfo.setUserAvatar(item);
    avatarSubmitButton.textContent = 'Сохранение...';
  }
);

popupForUserAvatar.setEventListeners();

// Создание экземпляра модального окна с картинкой
const popupWithImage = new PopupWithImage('.popup_picture');
popupWithImage.setEventListeners();

// Создание модального окна для удаления карточки
const popupWithDelete = new PopupWithForm(
  '.popup_delition',
  () => {
    popupWithDelete.close();
    api.deleteCard(popupWithDelete.targetId)
      .then(() => {
        popupWithDelete.targetObject.remove();
      })
      .catch(err => {
        console.log('Ошибка при удалении', err);
      });
  }
);

// Функция создания карточки
function createCard(item) {
  const card = new Card({
      name: item.name,
      link: item.link,
      likes: item.likes,
      _id: item._id,
      owner: item.owner
    },
    '.article',
    () => {
      popupWithImage.open(item.link, item.name);
    }, 
    (el, id) => {
      popupWithDelete.targetObject = el;
      popupWithDelete.targetId = id;
      popupWithDelete.open();
      popupWithDelete.setEventListeners();
    }, 
    api);

  return card.generateCard();
};

// Создание пустой секции для карточек
const cardList = new Section(
  (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }, cardsContainer
);

// Запрос на сервер с последующей отрисовкой исходных карточек
api.getInitialCards()
  .then(result => {
    cardList.renderItems(result);
  })
  .catch(err => {
    console.log('Ошибка при загрузке карточек', err.message);
  });


// Создание модального окна с формой для добавления новых карточек
const popupWithAdd = new PopupWithForm(
  '.popup_addition',
  (item) => {
    cardSubmitButton.textContent = 'Сохранение...';
    api.addNewCard(item)
      .then((res) => {
        const cardElement = createCard(res);    
        cardList.addItem(cardElement);
      })
      .catch(err => {
        console.log('Ошибка при загрузке карточек', err.message);
      });
  }
);

popupWithAdd.setEventListeners();

// Создание экземпляров класса валидации
const addCardValidator = new FormValidator(formSettingsObject, addFormElement); 
addCardValidator.enableValidation();

const editInfoValidator = new FormValidator(formSettingsObject, editFormElement);
editInfoValidator.enableValidation();

const chngeAvatarValidator = new FormValidator(formSettingsObject, changeAvatarFormElement);
chngeAvatarValidator.enableValidation();

// Добавление обработчиков кнопкам открытия модальных окон
openButtonAdd.addEventListener('click', () => {
  addCardValidator.toggleButtonState();
  cardSubmitButton.textContent = 'Сохранить';
  popupWithAdd.open();
});

openButtonEdit.addEventListener('click', () => {
  profileSubmitButton.textContent = 'Сохранить';
  popupWithEdit.open();
  nameInput.value = userInfo.getUserInfo().userName;
  jobInput.value = userInfo.getUserInfo().userJob;
});

editAvatarButton.addEventListener('click', () => {
  chngeAvatarValidator.toggleButtonState();
  avatarSubmitButton.textContent = 'Сохранить';
  popupForUserAvatar.open();
})