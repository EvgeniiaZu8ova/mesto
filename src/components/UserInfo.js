export default class UserInfo {
  constructor({ nameElement, jobElement, avatarElement }, api) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._avatarElement = document.querySelector(avatarElement);
    this._api = api;
  }

  loadUserInfo() {
    this._api.getUserInfo()
      .then((res) => {
        this._nameElement.textContent = res.name;
        this._jobElement.textContent = res.about;
        this._avatarElement.src = res.avatar;
      })
      .catch(err => {
        console.log('Ошибка при загрузке данных пользователя', err);
      });
  }

  getUserInfo() {
    return { 
      userName: this._nameElement.textContent,
      userJob: this._jobElement.textContent
    }
  }

  setUserInfo(data) {
    this._api.editUserInfo(data)
      .then((res) => {
        this._nameElement.textContent = res.name;
        this._jobElement.textContent = res.about;
      })
      .catch(err => {
        console.log('Ошибка при загрузке данных пользователя', err);
      });
  }

  setUserAvatar(data) {
    this._api.changeUserAvatar(data)
      .then((res) => {
        this._avatarElement.src = res.avatar;
      })
      .catch(err => {
        console.log('Ошибка при обновлении фотографии пользователя', err);
      });
  }
}