import { apiOptions } from './constants.js';

class Api {
  constructor({ url, token } ) {
    this._url = url;
    this._token = token;
  }

  _makeRequest(promise) {
    return promise.then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res.status;
    }).then(obj => {
      return obj;
    })
  }

  getUserInfo() {
    const promise = fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    return this._makeRequest(promise)
  }

  getCards() {
    const promise = fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    return this._makeRequest(promise)
  }

  updateProfileInfo({ name, about }) {
    const promise = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    return this._makeRequest(promise)
  }

  uploadCard({ name, link }) {
    const promise = fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    return this._makeRequest(promise)
  }

  deleteCard(id) {
    const promise = fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    return this._makeRequest(promise)
  }

  putLike(id) {
    const promise = fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    return this._makeRequest(promise)
  }

  deleteLike(id) {
    const promise = fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    return this._makeRequest(promise)
  }

  updateAvatar({ avatar }) {
    const promise = fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    return this._makeRequest(promise)
  }
}

const api = new Api(apiOptions);

export default api;