class Auth {
  constructor(options) {
    this._options = options;
  }

  _fetch(url, method, body, headers) {
    return fetch(`${this._options.baseUrl}${url}`, {
      headers: { ...this._options.headers, ...headers },
      method: method,
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
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

  fetchSignUp(password, email) {
    return this._fetch("/signup", "POST", {
      password,
      email,
    });
  }

  fetchSignIn(password, email) {
    return this._fetch("/signin", "POST", {
      password,
      email,
    });
  }

  fetchUser(token) {
    return this._fetch("/users/me", "GET", undefined, {
      Authorization: `Bearer ${token}`,
    });
  }
}

const auth = new Auth({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
