class signApi {
  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  signUp(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: data.pass,
        email: data.email
      })
    })
    .then(res => this._getResponseData(res))
  }
  signIn(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: data.pass,
        email: data.email
      })
    })
    .then(res => this._getResponseData(res))
  }
  getUser(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    })
    .then(res => this._getResponseData(res))
  }
}

export default new signApi({
  url: 'https://mestodd.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
});
