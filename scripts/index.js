// Задаём переменные
let popupEdit = document.querySelector('.popup_edition');
let popupAdd = document.querySelector('.popup_addition');

let openButtonEdit = document.querySelector('.profile__button_edit');
let openButtonAdd = document.querySelector('.profile__button_add');

let closeButtonEdit = document.querySelector('.popup__close-icon_edit');
let closeButtonAdd = document.querySelector('.popup__close-icon_add');

let likeButtons = document.querySelectorAll('.article__button');

let formElementEdit = document.querySelector('.popup__container_edition');
let formElementAdd = document.querySelector('.popup__container_addition');

let nameElement = document.querySelector('.profile__title');
let jobElement = document.querySelector('.profile__subtitle');
let placeElement = document.querySelector('.article__name');
let linkElement = document.querySelector('.article__image');

let placeElements = document.querySelectorAll('.article__name');
let linkElements = document.querySelectorAll('.article__image');

let nameInput = document.querySelector('.popup__text_input_name');
let jobInput = document.querySelector('.popup__text_input_job');
let placeInput = document.querySelector('.popup__text_input_place');
let linkInput = document.querySelector('.popup__text_input_link');

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

// Передаём в форму с карточками названия и изображения из массива initialCards
for (let i = 0; i < placeElements.length; i++) {
  placeElements[i].textContent = initialCards[i].name;
  linkElements[i].src = initialCards[i].link;
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

// Функция считывания введённых пользователем данных в форму
function handleEditFormSubmit (evt) {
  // Отменяем автоматическое обновление страницы при отправке формы
  evt.preventDefault();
  // Заменяем данные на странице на информацию из формы ввода
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Функция закрашивания кнопки лайка
function likePicture (like) {
  // Проверяем, содержит ли кнопка лайка модификатор активной кнопки
  if (!(like.classList.contains('article__button_active'))) {
    // Если не содержит, добавляем; в противном случае - убираем модификатор
    like.classList.add('article__button_active');
  } else {
    like.classList.remove('article__button_active');
  }
}

// Функция добавления новой карточки и обновления поля с карточками
function handleAddFormSubmit (evt) {
  // Отменяем автоматическое обновление страницы при отправке формы
  evt.preventDefault();
  // Сдвигаем все карточки на одну вправо, освобождая место для новой карточки
  const a = placeElements.length;
  for (let i = 1; i < a; i++) {
    placeElements[a - i].textContent = placeElements[a - i - 1].textContent;
    linkElements[a - i].src = linkElements[a - i - 1].src;
  }
  // Добавляем в первое поле для карточек свою, новую карточку
  placeElement.textContent = placeInput.value;
  linkElement.src = linkInput.value;
  closePopup(popupAdd);
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
})

// Необходимо, чтобы можно было применить возможность поставить лайк ко всем элементам с картинками
for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function () {
    likePicture(likeButtons[i]);
  })
}

formElementEdit.addEventListener('submit', handleEditFormSubmit);
formElementAdd.addEventListener('submit', handleAddFormSubmit);