class Api {
  constructor(options) {
    this._options = options;
  }

  _fetch(url, method, body) {
    return fetch(`${this._options.baseUrl}${url}`, {
      headers: this._options.headers,
      method: method,
      credentials: 'include',
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => res);
  }

  fetchUser() {
    return this._fetch("/users/me", "GET");
  }

  fetchCards() {
    return this._fetch("/cards", "GET");
  }

  setLike(id) {
    return this._fetch(`/cards/${id}/likes`, "PUT");
  }

  deleteLike(id) {
    return this._fetch(`/cards/${id}/likes`, "DELETE");
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLike(id);
    } else {
      return this.setLike(id);
    }
  }

  deleteCard(id) {
    return this._fetch(`/cards/${id}`, "DELETE");
  }

  editAvatar(link) {
    return this._fetch(`/users/me/avatar`, "PATCH", {
      avatar: link,
    });
  }

  editProfile(name, about) {
    return this._fetch(`/users/me`, "PATCH", {
      name,
      about,
    });
  }

  createCard(name, link) {
    return this._fetch(`/cards`, "POST", {
      name,
      link,
    });
  }
}

const api = new Api({
  baseUrl: "https://api.students.dasha.nomoredomains.club",
  headers: {
    // authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E0YjM5ZGE4MTUwMDA3YzU4NjVhYTgiLCJpYXQiOjE2NzE3MzgyODcsImV4cCI6MTY3MjM0MzA4N30.2uUeDuzfsWgnnfkrYpJ53cCYkuQrHYFJayEGvjSPnko",
    "Content-Type": "application/json",
  },
});

export default api;
