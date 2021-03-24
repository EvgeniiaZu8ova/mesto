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
});

// Запрос на сервер данных пользователя
api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
    userInfo.setUserAvatar(res);
  })
  .catch(err => {
    console.log('Ошибка при загрузке данных пользователя', err);
  });

// Создание модального окна с формой для обновления данных пользователя
const popupWithEdit = new PopupWithForm(
  '.popup_edition',
  (item) => {
    profileSubmitButton.textContent = 'Сохранение...';
    api.editUserInfo(item)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithEdit.close();
      })
      .catch(err => {
        console.log('Ошибка при обновлении данных пользователя', err);
      });
  }
);

popupWithEdit.setEventListeners();

// Создание модального окна с формой для обновления аватара пользователя
const popupForUserAvatar = new PopupWithForm(
  '.popup_change-avatar',
  (item) => {
    avatarSubmitButton.textContent = 'Сохранение...';
    api.changeUserAvatar(item)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupForUserAvatar.close();
      })
      .catch(err => {
        console.log('Ошибка при обновлении аватара пользователя', err);
      });
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
    api.deleteCard(popupWithDelete.targetId)
      .then(() => {
        popupWithDelete.targetObject.remove();
        popupWithDelete.close();
      })
      .catch(err => {
        console.log('Ошибка при удалении карточки', err);
      });
  }
);

popupWithDelete.setEventListeners();

// Функция создания карточки
function createCard(item, userId) {
  const card = new Card({
      name: item.name,
      link: item.link,
      likes: item.likes,
      _id: item._id,
      owner: item.owner
    },
    userId,
    '.article',
    () => {
      popupWithImage.open(item.link, item.name);
    }, 
    (el, id) => {
      popupWithDelete.targetObject = el;
      popupWithDelete.targetId = id;
      popupWithDelete.open();
    },
    (id, actLikeButton, updLikes) => {
      api.putLikeOnCard(id)
        .then((res) => {
          actLikeButton();
          updLikes(res);
        })
        .catch(err => {
          console.log('Ошибка при попытке поставить лайк', err);
        });
    },
    (id, desactLikeButton, updLikes) => {
      api.removeLikeFromCard(id)
        .then((res) => {
          desactLikeButton();
          updLikes(res);
        })
        .catch(err => {
          console.log('Ошибка при попытке убрать лайк', err);
        });
    }
    );

  return card.generateCard();
};

// Создание пустой секции для карточек
const cardList = new Section(
  (item, userId) => {
    const cardElement = createCard(item, userId);
    cardList.addItem(cardElement);
  }, cardsContainer
);

// Запрос на сервер с последующей отрисовкой исходных карточек
api.getUserInfo()
  .then((res) => {
    return res._id;
  })
  .then((id) => {
    api.getInitialCards()
      .then(result => {
        cardList.renderItems(result.reverse(), id);
      })
      .catch(err => {
        console.log('Ошибка при загрузке карточек', err.message);
      });
  })
  .catch(err => {
    console.log('Ошибка при загрузке данных пользователя', err.message);
  });


// Создание модального окна с формой для добавления новых карточек
const popupWithAdd = new PopupWithForm(
  '.popup_addition',
  (item) => {
    cardSubmitButton.textContent = 'Сохранение...';
    api.getUserInfo()
      .then((res) => {
        return res._id;
      })
      .then((id) => {
        api.addNewCard(item)
          .then((res) => {
            const cardElement = createCard(res, id);    
            cardList.addItem(cardElement);
            popupWithAdd.close();
          })
          .catch(err => {
            console.log('Ошибка при добавлении новой карточки', err.message);
          });
      })
      .catch(err => {
        console.log('Ошибка при загрузке данных пользователя', err.message);
      });
  }
);

popupWithAdd.setEventListeners();

// Создание экземпляров класса валидации
const addCardValidator = new FormValidator(formSettingsObject, addFormElement); 
addCardValidator.enableValidation();

const editInfoValidator = new FormValidator(formSettingsObject, editFormElement);
editInfoValidator.enableValidation();

const changeAvatarValidator = new FormValidator(formSettingsObject, changeAvatarFormElement);
changeAvatarValidator.enableValidation();

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
  changeAvatarValidator.toggleButtonState();
  avatarSubmitButton.textContent = 'Сохранить';
  popupForUserAvatar.open();
})