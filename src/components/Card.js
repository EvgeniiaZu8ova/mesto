export default class Card {
  constructor({ name, link, likes, _id, owner }, cardSelector, handleCardClick, handleDeleteCard, api) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._likesNumber = likes.length;
    this._id = _id;
    this._ownerId = owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._api = api;
    this._template = document.querySelector('template').content;
    this._handleLikeButton = this._handleLikeButton.bind(this);
  }

  // Настроить отображение кнопок удаления и лайка, в зависимости от создателя карточки
  // и в зависимости от того, лайкали ли Вы эту карточку ранее
  _setButtons() {
    this._api.getUserInfo()
      .then((res) => {
        if (this._ownerId === res._id) {
          this._deleteButton.classList.add('article__delete-button_active')
        } else {
          this._deleteButton.disabled = true;
          this._deleteButton.classList.remove('article__delete-button_active');
        }

        if (this._likes.some(el => el._id === res._id)) {
          this._likeButton.classList.add('article__like-button_active');
        } else {
          this._likeButton.classList.remove('article__like-button_active');
        }
      })
      .catch(err => {
        console.log('Ошибка при получении id пользователя', err);
      });  
  }

   // Обработка нажатия на лайк
   _handleLikeButton() {
    // Проверить, присутствуете ли Вы в массиве с лайкнувшими пользователями 
    // Обновить количество лайков, добавить/убрать себя из массива
    this._api.getUserInfo()
      .then((res) => {
        if (this._likes.some(el => el._id === res._id)) {
          this._api.removeLikeFromCard(this._id)
            .then((data) => {
              this._likes = data.likes;
              this._cardLikes.textContent = data.likes.length;
              this._likeButton.classList.remove('article__like-button_active');
            })
            .catch(err => {
              console.log('Ошибка при попытке убрать лайк', err);
            });
        }

        this._api.putLikeOnCard(this._id)
          .then((data) => {
            this._likes = data.likes;
            this._cardLikes.textContent = data.likes.length;
            this._likeButton.classList.add('article__like-button_active');
          })
          .catch(err => {
            console.log('Ошибка при попытке поставить лайк', err);
          });
      })
      .catch(err => {
        console.log('Ошибка при обновлении информации о кол-ве лайков', err);
      });
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

    this._likeButton.addEventListener('click', this._handleLikeButton);

    this._cardImage.addEventListener('click', this._handleCardClick);
  }
}