import "../index.css";
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MainContent from "./MainContent";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const history = useHistory();

  // const checkToken = () => {
  //   // const jwt = localStorage.getItem("jwt");
  //   // if (jwt) {
  //   // проверим токен
  //   auth
  //     .fetchUser()
  //     .then((res) => {
  //       if (res) {
  //         setEmail(res.data.email);
  //         // авторизуем пользователя
  //         setLoggedIn(true);
  //         // обернём App.js в withRouter
  //         // так, что теперь есть доступ к этому методу
  //         history.push("/");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  //   // }
  // };

  // useEffect(() => {
  //   checkToken();
  // }, []);

  useEffect(() => {

    api
      .fetchUser()
      .then((res) => {
        if (res.email) {
          setCurrentUser(res);
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        }

      })
      .catch((err) => console.log(err));
  }, [history, loggedIn]);

  const onLoginSubmit = (username, password) => {
    auth
      .fetchSignIn(password, username)
      .then((res) => {


        if (Object.keys(res).length === 0) {
          setLoggedIn(true); // обновляем стейт внутри App.js
          history.push("/"); // и переадресуем пользователя!
        }
      })
      .catch((err) => console.log(err));
  };

  const onRegisterSubmit = (password, email) => {
    auth
      .fetchSignUp(password, email)
      .then((res) => {
        setOpen(true);
        setIsErrorResponse(res._id ? false : true);
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
        setIsErrorResponse(true);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/signin">
          <Login onSubmit={onLoginSubmit} />
        </Route>
        <Route exact path="/signup">
          <Register
            onRegisterSubmit={onRegisterSubmit}
            isOpen={open}
            isErrorResponse={isErrorResponse}
            onClose={() => setOpen(false)}
          />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={MainContent}
          updateUser={setCurrentUser}
          resetLogedIn={() => setLoggedIn(false)}
          email={email}
          exact
        />
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
