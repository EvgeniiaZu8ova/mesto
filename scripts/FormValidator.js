class FormValidator {
  constructor(formSettingsObject, formElement) {
    this._inputSelector = formSettingsObject.inputSelector;
    this._submitButtonSelector = formSettingsObject.submitButtonSelector;
    this._inactiveButtonClass = formSettingsObject.inactiveButtonClass;
    this._inputErrorClass = formSettingsObject.inputErrorClass;
    this._errorClass = formSettingsObject.errorClass;
    this._formElement = formElement;
  }

  // Валидировать форму
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._handleFormInteface();
  }

  // Проверить поля формы на корректность формата введенных данных
  _hasInvalidInput() {
    return Array.from(this._formElement.querySelectorAll(this._inputSelector)).some((item) => {
      return !item.validity.valid;
    })
  }

  // Перебрать все поля формы, проверить каждое, настроить вид кнопки отправки и полей ввода в зависимости от результата
  _handleErrorMessage() {
    const formInputs = this._formElement.querySelectorAll(this._inputSelector);
    formInputs.forEach((el) => {
      el.addEventListener('input', () => {
        if (!el.validity.valid) {
          el.classList.add(this._inputErrorClass);
          this._formElement.querySelector(`.${el.id}-error`).textContent = el.validationMessage;
          this._formElement.querySelector(`.${el.id}-error`).classList.add(this._errorClass);
        } else {
          el.classList.remove(this._inputErrorClass);
          this._formElement.querySelector(`.${el.id}-error`).textContent = '';
          this._formElement.querySelector(`.${el.id}-error`).classList.remove(this._errorClass);
        }
        this._toggleButtonState();
      })  
    })
  }

  // Сделать кнопку отправки доступной или недоступной в зависимости от результатов валидации
  _toggleButtonState() {
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput()) {
      submitButton.disabled = true;
      submitButton.classList.add(this._inactiveButtonClass);
    
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  // Задать настройки полям и кнопке отправки в зависимости от результатов валидации
  _handleFormInteface() {
    this._toggleButtonState();
    this._handleErrorMessage();
  }
}

export { FormValidator };