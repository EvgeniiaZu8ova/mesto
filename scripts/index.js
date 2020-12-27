let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__button_edit');
let closeButton = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__container');
let nameElement = document.querySelector('.profile__title');
let jobElement = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__text_name');
let jobInput = document.querySelector('.popup__text_job');

openButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
})

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);