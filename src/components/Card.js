export default class Card {
  constructor({ name, link, likes, _id, owner }, userId, cardSelector, handleCardClick, handleDeleteCard, addLike, removeLike) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._likesNumber = likes.length;
    this._id = _id;
    this._ownerId = owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._template = document.querySelector('template').content;
    this._updateLikesQuantity = this._updateLikesQuantity.bind(this);
    this._activateLikeButton = this._activateLikeButton.bind(this);
    this._desactivateLikeButton = this._desactivateLikeButton.bind(this);
  }

  // Настроить отображение кнопок удаления и лайка, в зависимости от создателя карточки
  // и в зависимости от того, лайкали ли Вы эту карточку ранее
  _setButtons() {
    if (this._ownerId === this._userId) {
      this._deleteButton.classList.add('article__delete-button_active')
    } else {
      this._deleteButton.disabled = true;
      this._deleteButton.classList.remove('article__delete-button_active');
    }

    if (this._checkIsLiked()) {
      this._activateLikeButton();
    } else {
      this._desactivateLikeButton();
    }
  }
  
  // Обновить количество лайков
  _updateLikesQuantity(data) {
    this._likes = data.likes;
    this._cardLikes.textContent = data.likes.length;
  }

  _activateLikeButton() {
    this._likeButton.classList.add('article__like-button_active');
  }

  _desactivateLikeButton() {
    this._likeButton.classList.remove('article__like-button_active');
  }

  _checkIsLiked() {
    return this._likes.some(el => el._id === this._userId);
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
    this._cardLikes = this._element.querySelector('.article__like-quantity');
    this._deleteButton = this._element.querySelector('.article__delete-button');
    this._likeButton = this._element.querySelector('.article__like-button');

    this._setButtons();
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._cardLikes.textContent = this._likesNumber;

    return this._element;
  }

  // Добавить обработчики событий
  _setEventListeners() {
    this._deleteButton.addEventListener('click', (evt) => {
      this._handleDeleteCard(evt.target.closest(this._cardSelector), this._id);
    });

    this._likeButton.addEventListener('click', () => {
      if (this._checkIsLiked()) {
        this._removeLike(this._id, this._desactivateLikeButton, this._updateLikesQuantity);
      } else {
        this._addLike(this._id, this._activateLikeButton, this._updateLikesQuantity);
      }
    });

    this._cardImage.addEventListener('click', this._handleCardClick);
  }
}