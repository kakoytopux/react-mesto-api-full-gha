class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  _getRequest(url, options) {
    return fetch(`${this._baseUrl}${url}`, {
      method: options.method,
      headers: this._headers,
      body: options.body
    })
    .then(res => this._getResponseData(res))
  }
  getInitialCards() {
    return this._getRequest('/cards', {
      method: 'GET'
    })
  }
  infoProfile() {
    return this._getRequest('/users/me', {
      method: 'GET'
    })
  }
  editProfile(data) {
    return this._getRequest('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }
  addCard(data) {
    return this._getRequest('/cards', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
  }
  deleteCard(cardId) {
    return this._getRequest(`/cards/${cardId}`, {
      method: 'DELETE'
    })
  }
  likeCard(cardId) {
    return this._getRequest(`/cards/${cardId}/likes`, {
      method: 'PUT'
    })
  }
  deleteLikeCard(cardId) {
    return this._getRequest(`/cards/${cardId}/likes`, {
      method: 'DELETE'
    })
  }
  editAvatar(avatarLink) {
    return this._getRequest(`/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
  }
}

export default new Api({
  baseUrl: 'https://mestodd.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
});
