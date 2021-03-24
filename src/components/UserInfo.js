export default class UserInfo {
  constructor({ nameElement, jobElement, avatarElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.about;  
  }

  setUserAvatar(data) {
    this._avatarElement.src = data.avatar;
  }

  getUserInfo() {
    return { 
      userName: this._nameElement.textContent,
      userJob: this._jobElement.textContent
    }
  }
}