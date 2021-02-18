import { openPopup, closePopup } from './index.js';

const template = document.querySelector('template').content;
const popupPict = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupParagraph = document.querySelector('.popup__paragraph');
const closeButtonPict = document.querySelector('.popup__close-icon_pic');

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // Получить темплейт карточки
  _getTemplate() {
    const cardElement = template.cloneNode(true);
    return cardElement;
  }

  // Вернуть элемент заполненной карточки
  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.article__image');
    const cardName = this._element.querySelector('.article__name');
    
    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardName.textContent = this._name;

    return this._element;
  }

  // Удалить карточку
  _handleDeleteCard(evt) {
    evt.target.closest('.article').remove();
  }

  // Поставить лайк карточке
  _handleLikeIcon(evt) {
    evt.target.classList.toggle('article__like-button_active');
  }

  // Настроить предпросмотр карточки в модальном окне
  _handlePreviewPicture() {
    popupImage.src = this._link;
    popupParagraph.textContent = this._name;
    openPopup(popupPict);
  }

  // Добавить обработчики событий
  _setEventListeners() {
    const deleteButton = this._element.querySelector('.article__delete-button');
    const likeButton = this._element.querySelector('.article__like-button');

    popupImage.addEventListener('click', () => {
      openPopup(popupPict);
    });

    closeButtonPict.addEventListener('click', () => {
      closePopup(popupPict);
    });

    deleteButton.addEventListener('click', this._handleDeleteCard);

    likeButton.addEventListener('click', this._handleLikeIcon);

    this._element.querySelector('.article__image').addEventListener('click', () => {
      this._handlePreviewPicture();
    });
  }
}

export { Card };