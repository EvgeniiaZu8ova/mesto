export default class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._nameInput = document.querySelector('.popup__text_input_name');
    this._jobInput = document.querySelector('.popup__text_input_job');
  }

  getUserInfo() {
    this._nameInput.value = this._nameElement.textContent;
    this._jobInput.value = this._jobElement.textContent;
  }

  setUserInfo() {
    this._nameElement.textContent = this._nameInput.value;
    this._jobElement.textContent = this._jobInput.value;
  }
}