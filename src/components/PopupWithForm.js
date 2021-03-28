import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__container');
    this._submitButton = this._popup.querySelector('.popup__button');
  }

  _getInputValues() {
    this._inputValues = this._popup.querySelectorAll('.popup__text');

    this._formValues = {};
    this._inputValues.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._submitButton.disabled = true;
    })
  }

  close() {
    super.close();

    this._form.reset();
  }
}

