class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._template = document.querySelector('template').content;
  }

  // Получить темплейт карточки
  _getTemplate() {
    const cardElement = this._template.cloneNode(true);
    return cardElement;
  }

  // Вернуть элемент заполненной карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.article__image');
    this._cardName = this._element.querySelector('.article__name');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

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

  // Добавить обработчики событий
  _setEventListeners() {
    this._deleteButton = this._element.querySelector('.article__delete-button');
    this._likeButton = this._element.querySelector('.article__like-button');

    this._deleteButton.addEventListener('click', this._handleDeleteCard);

    this._likeButton.addEventListener('click', this._handleLikeIcon);

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export { Card };