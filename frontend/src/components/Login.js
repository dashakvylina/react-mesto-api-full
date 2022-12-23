import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../index.css";
import Header from "./Header";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state.username, this.state.password);

    this.setState({
      username: "",
      password: "",
    });
  }
  render() {
    return (
      <div className="page">
        <Header
          rightContent={
            <div className="login__signup">
              <Link to="/signup" className="signup__link">
                Регистрация
              </Link>
            </div>
          }
        />
        <div className="login">
          <h1 className="login__welcome">Вход</h1>
          <form onSubmit={this.handleSubmit} className="login__form">
            <input
              required
              id="username"
              name="username"
              type="text"
              placeholder="Email"
              value={this.state.username}
              onChange={this.handleChange}
              className="login__input"
            />
            <input
              required
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              value={this.state.password}
              onChange={this.handleChange}
              className="login__input"
            />
            <div className="login__button-container">
              <button type="submit" className="login__link">
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
