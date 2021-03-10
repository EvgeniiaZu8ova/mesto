import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._paragraph = this._popup.querySelector('.popup__paragraph');
  }

  open(link, name) {
    this._image.src = this.link;
    this._paragraph.textContent = this.name;
    this._image.setAttribute('alt', `увеличенное изображение ${this.name}`);
    super.open();
  }
}