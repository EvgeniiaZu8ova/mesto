// Задаём переменные
// Окна pop-up
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
const placeInput = document.querySelector('.popup__text_input_place');
const linkInput = document.querySelector('.popup__text_input_link');

// Переменные для работы с данными, введенными пользователем
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

// Работа с темплейтом
const template = document.querySelector('template').content;
const cardsContainer = document.querySelector('.elements');

// Массив с исходными карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Добавляем на страницу начальные карточки из массива initialCards
for (let i = 0; i < initialCards.length; i++) {
  // Копируем свёрстанный темплейт
  const cardCopy = template.cloneNode(true);
  // Заполняем копии данными из массива
  cardCopy.querySelector('.article__image').src = initialCards[i].link;
  cardCopy.querySelector('.article__image').alt = initialCards[i].name;
  cardCopy.querySelector('.article__name').textContent = initialCards[i].name;
  // Добавляем карточки в DOM
  cardsContainer.append(cardCopy);
};

// Инициализируем массивы с элементами имеющихся на странице карточек
const cards = document.querySelectorAll('.article');
const linkElements = document.querySelectorAll('.article__image');
const placeElements = document.querySelectorAll('.article__name');
const likeButtons = document.querySelectorAll('.article__like-button');
const deleteButtons = document.querySelectorAll('.article__delete-button');

// Функция добавления новой карточки
function handleAddFormSubmit (evt) {
  // Отменяем автоматическое обновление страницы при отправке формы
  evt.preventDefault();
  // Копируем темплейт, заполняем копию введёнными пользователем данными
  const cardCopy = template.cloneNode(true);
  cardCopy.querySelector('.article__image').src = linkInput.value;
  cardCopy.querySelector('.article__image').alt = placeInput.value;
  cardCopy.querySelector('.article__name').textContent = placeInput.value;
  // Добавляем новую карточку в начало секции
  cardsContainer.prepend(cardCopy);
  closePopup(popupAdd);
}

// Функция открытия формы
function openPopup(popup) {
  // добавляем элементу pop-up модификатор для вызова формы
  popup.classList.add('popup_opened');
  // отображаем имеющиеся данные в полях ввода
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  placeInput.value = 'Название';
  linkInput.value = 'Ссылка на картинку';
}

// Функция закрытия формы
function closePopup(popup) {
  // удаляем модификатор отображения формы у элемента pop-up
  popup.classList.remove('popup_opened');
}

// Функция активации кнопки лайка
function likePicture (like) {
  // Проверяем, содержит ли кнопка лайка модификатор активной кнопки
  if (!(like.classList.contains('article__like-button_active'))) {
    // Если не содержит, добавляем; в противном случае - убираем модификатор
    like.classList.add('article__like-button_active');
  } else {
    like.classList.remove('article__like-button_active');
  }
}

// Функция удаления карточки
function deleteCard (card) {
  card.remove();
}

// Функция считывания введённых пользователем данных в форму
function handleEditFormSubmit (evt) {
  // Отменяем автоматическое обновление страницы при отправке формы
  evt.preventDefault();
  // Заменяем данные на странице на информацию из формы ввода
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Добавляем слушатели
openButtonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
});

openButtonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
});

closeButtonEdit.addEventListener('click', function () {
  closePopup(popupEdit);
});

closeButtonAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

closeButtonPict.addEventListener('click', function () {
  closePopup(popupPict);
});

formElementEdit.addEventListener('submit', handleEditFormSubmit);

formElementAdd.addEventListener('submit', handleAddFormSubmit);

// Необходимо, чтобы можно было применить возможность поставить лайк ко всем элементам с картинками, поэтому используем цикл
for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function () {
    likePicture(likeButtons[i]);
  })
}

// Необходимо, чтобы можно было удалять карточки с использованием всех иконок удаления, поэтому используем цикл
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', function () {
    deleteCard(cards[i]);
  })
}

// Необходимо, чтобы можно было вызвать поп-ап с картинкой при нажатии на любую карточку, поэтому используем цикл
for (let i = 0; i < linkElements.length; i++) {
  linkElements[i].addEventListener('click', function () {
  popupImage.src = linkElements[i].src;
  popupParagraph.textContent = placeElements[i].textContent;
  openPopup(popupPict);
  })
}