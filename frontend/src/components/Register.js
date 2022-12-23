import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";
import { useHistory } from "react-router-dom";

const Register = ({ onRegisterSubmit, isErrorResponse, isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  console.log("isOpen", isOpen);
  console.log("isErrorResponse", isErrorResponse);

  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь обработчик регистрации

    onRegisterSubmit(password, email);
  };

  const handleClose = () => {
    onClose();
    if (!isErrorResponse) {
      setEmail("");
      setPassword("");
      history.push("/signin");
    }
  };
  return (
    <>
      <div className="page">
        <Header
          rightContent={
            <div className="login__signup">
              <Link to="/signin" className="signup__link">
                Войти
              </Link>
            </div>
          }
        />
        <div className="login">
          <h1 className="login__welcome">Регистрация</h1>
          <form onSubmit={handleSubmit} className="login__form">
            <input
              required
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="login__input"
            />
            <input
              required
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="login__input"
            />
            <div className="login__button-container">
              <button type="submit" className="login__link">
                Регистрация
              </button>
            </div>
          </form>
          <div className="login__subtext">
            <span>Уже зарегистрированы?</span>
            <Link to="/signin" className="login__sublink">
              Войти
            </Link>
          </div>
        </div>
      </div>

      <InfoTooltip
        isOpen={isOpen}
        text={
          isErrorResponse ? (
            <>
              <div>Что-то пошло не так!</div>
              <div>Попробуйте еще раз.</div>
            </>
          ) : (
            <>
              <div>Вы успешно</div>
              <div>зарегистрировались!</div>
            </>
          )
        }
        isError={isErrorResponse}
        onClose={handleClose}
      />
    </>
  );
};

export default Register;
