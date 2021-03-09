export default class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
  }

  getUserInfo() {
    return { 
      userName: this._nameElement.textContent,
      userJob: this._jobElement.textContent
    }
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.userName;
    this._jobElement.textContent = data.userJob;
  }
}