export default class FormValidator {
  constructor(formSettingsObject, formElement) {
    this._inputSelector = formSettingsObject.inputSelector;
    this._submitButtonSelector = formSettingsObject.submitButtonSelector;
    this._inactiveButtonClass = formSettingsObject.inactiveButtonClass;
    this._inputErrorClass = formSettingsObject.inputErrorClass;
    this._errorClass = formSettingsObject.errorClass;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  // Валидировать форму
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  // Проверить поля формы на корректность формата введенных данных
  _hasInvalidInput() {
    return Array.from(this._inputList).some((item) => {
      return !item.validity.valid;
    })
  }

  // Функция изменения настроек отображения полей формы при вводе невалидных данных
  _showInputError() {
    this._inputList.forEach((el) => {
      const formError = this._formElement.querySelector(`.${el.id}-error`);
      el.classList.add(this._inputErrorClass);
      formError.textContent = el.validationMessage;
      formError.classList.add(this._errorClass);
    })
  }

  // Функция изменения настроек отображения полей формы при вводе валидных данных
  _hideInputError() {
    this._inputList.forEach((el) => {
      const formError = this._formElement.querySelector(`.${el.id}-error`);
      el.classList.remove(this._inputErrorClass);
      formError.textContent = '';
      formError.classList.remove(this._errorClass);
    })
  }

  // Функция проверки валидности введенных в форму данных
  _isValid() {
    if (this._hasInvalidInput()) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  // Сделать кнопку отправки доступной или недоступной в зависимости от результатов валидации
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  // Функция добавления обработчиков полям формы
  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((el) => {
      el.addEventListener('input', () => {
        this._isValid();
        this.toggleButtonState();
      })
    })
  }
}