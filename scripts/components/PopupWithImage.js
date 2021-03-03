import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._paragraph = this._popup.querySelector('.popup__paragraph');
    this._name = name;
    this._link = link;
  }

  open() {
    super.open();

    this._image.src = this._link;
    this._paragraph.textContent = this._name;
  }
}