import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._paragraph = this._popup.querySelector('.popup__paragraph');
  }

  open(link, name) {
    this._image.src = link;
    this._paragraph.textContent = name;
    this._image.setAttribute('alt', `увеличенное изображение ${name}`);
    super.open();
  }
}