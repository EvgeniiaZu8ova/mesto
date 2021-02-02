// Задаём переменные
// Окна pop-up
const popupOverlays = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edition');
const popupAdd = document.querySelector('.popup_addition');
const popupPict = document.querySelector('.popup_picture');

// Кнопки открытия и закрытия pop-up
const openButtonEdit = document.querySelector('.profile__button_edit');
const openButtonAdd = document.querySelector('.profile__button_add');
const closeButtonEdit = document.querySelector('.popup__close-icon_edit');
const closeButtonAdd = document.querySelector('.popup__close-icon_add');
const closeButtonPict = document.querySelector('.popup__close-icon_pic');

// Элементы pop-up окна для просмотра карточек
const popupImage = document.querySelector('.popup__image');
const popupParagraph = document.querySelector('.popup__paragraph');

// Элементы форм отправки
const formElementEdit = document.querySelector('.popup__container_edition');
const formElementAdd = document.querySelector('.popup__container_addition');

// Заполняемые пользователем поля
const nameInput = document.querySelector('.popup__text_input_name');
const jobInput = document.querySelector('.popup__text_input_job');

// Переменные для работы с данными, введенными пользователем
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

// Работа с темплейтом
const template = document.querySelector('template').content;
const cardsContainer = document.querySelector('.elements');

// Функция открытия формы
const openPopup = (popup) => {
  // добавляем элементу pop-up модификатор для вызова формы
  popup.classList.add('popup_opened');
  popup.addEventListener('keydown', keyHandler);
};

// Функция закрытия формы
const closePopup = (popup) => {
  // удаляем модификатор отображения формы у элемента pop-up
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', keyHandler);
};

// Возможность закрыть модальное окно нажатием на Esc
const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(evt.target);
  }
};

// Функция считывания введённых пользователем данных в форму
const handleEditFormSubmit = (evt) => {
  // Отменяем автоматическое обновление страницы при отправке формы
  evt.preventDefault();
  // Заменяем данные на странице на информацию из формы ввода
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(popupEdit);
};

// Функция удаления карточки
const handleDeleteCard = (evt) => {
  evt.target.closest('.article').remove();
};

// Функция лайка карточки
const handleLikeIcon = (evt) => {
  evt.target.classList.toggle('article__like-button_active');
};

// Функция открытия pop-up с карточкой
const handlePreviewPicture = (image, paragraph) => {
  popupImage.src = image.src;
  popupParagraph.textContent = paragraph.textContent;
  openPopup(popupPict);
};

// Функция возврата элемента карточки (клонирует темплейт, заполняет его поля, добавляет обработчики)
const getCardElement = (data) => {
  const cardElement = template.cloneNode(true);
  const cardImage = cardElement.querySelector('.article__image');
  const cardName = cardElement.querySelector('.article__name');
  const deleteButton = cardElement.querySelector('.article__delete-button');
  const likeButton = cardElement.querySelector('.article__like-button');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardName.textContent = data.name;
  deleteButton.addEventListener('click', handleDeleteCard);
  likeButton.addEventListener('click', handleLikeIcon);
  cardImage.addEventListener('click', () => handlePreviewPicture (cardImage, cardName));
  return cardElement;
};

// Функция перебора массива
const renderCards = (data) => {
  data.forEach((item) => {
    cardsContainer.prepend(getCardElement(item));
  });
};

// Добавляем слушатели
popupOverlays.forEach((el) => { 
  el.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  });
});

openButtonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

closeButtonEdit.addEventListener('click', function () {
  closePopup(popupEdit);
});

openButtonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
  formElementAdd.reset();
});

closeButtonAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

closeButtonPict.addEventListener('click', function () {
  closePopup(popupPict);
});

formElementEdit.addEventListener('submit', handleEditFormSubmit);

formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardInput = [
    {
      name: document.querySelector('.popup__text_input_place').value,
      link: document.querySelector('.popup__text_input_link').value
    }
  ];
    renderCards(cardInput);
    closePopup(popupAdd);
});

renderCards(initialCards.reverse());