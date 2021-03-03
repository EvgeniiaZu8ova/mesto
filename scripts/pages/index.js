import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, popupOverlays, popupEdit, popupAdd,
        popupPict, popupImage, popupParagraph, openButtonEdit,
        openButtonAdd, closeButtonEdit, closeButtonAdd, closeButtonPict,
        closeButtonPopup, formElementEdit, formElementAdd, nameInput, 
        jobInput, nameElement, jobElement, placeElement, linkElement, 
        cardsContainer, forms } from '../utils/constants.js';

// Отрисовка карточек
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

cardList.renderItems();

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

validateForms(forms);

// Добавляем слушатели
popupOverlays.forEach((el) => {
  el.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    };
  });
});

openButtonEdit.addEventListener('click', () => {
  const popupEdit = new PopupWithForm('.popup_edition', () => {
    const userInfo = new UserInfo({
      nameElement: '.profile__title',
      jobElement: '.profile__subtitle'
    });

    userInfo.getUserInfo();
  });
  popupEdit.open();
  popupEdit.setEventListeners();
});

openButtonAdd.addEventListener('click', () => {
  const popupAdd = new PopupWithForm('.popup_addition', () => {

  });
});

closeButtonEdit.addEventListener('click', popupEdit.close);

closeButtonAdd.addEventListener('click', popupAdd.close);







// formElementEdit.addEventListener('submit', handleEditFormSubmit);

// formElementAdd.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   const cardInput = [
//     {
//       name: placeElement.value,
//       link: linkElement.value
//     }
//   ];
//     renderCards(cardInput);
//     closePopup(popupAdd);
// });

// Функция открытия формы
// const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEsc);
// };

// Функция закрытия формы
// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupEsc);
// };

// Возможность закрыть модальное окно нажатием на Esc
// const closePopupEsc = (evt) => {
//   const openedPopup = document.querySelector('.popup_opened'); 
//   if (evt.key === 'Escape') {
//     closePopup(openedPopup);
//   }
// };

// Обработчик для модального окна с предпросмотром карточек
// const handleCardClick = (name, link) => {
//   popupImage.src = link;
//   popupParagraph.textContent = name;
//   openPopup(popupPict);
// };

// Функция считывания введённых пользователем данных в форму
// const handleEditFormSubmit = (evt) => {
//   evt.preventDefault();
//   nameElement.textContent = nameInput.value;
//   jobElement.textContent = jobInput.value;
//   closePopup(popupEdit);
// };
