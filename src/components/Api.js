export default class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Отображение карточек с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers
    })
      .then(this._checkResponse);
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        link: data.link,
        name: data.name
      })
    })
      .then(this._checkResponse);
  }

  // Получение информации о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  // Редактирование информации пользователя
  changeUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
      .then(this._checkResponse);
  }

  // Замена аватара
  changeUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(this._checkResponse);
  }

  // Поставить лайк карточке
  putLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  // Убрать лайк карточки
  removeLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkResponse);
  }
}
