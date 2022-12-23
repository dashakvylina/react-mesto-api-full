import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name ?? "");
      setDescription(currentUser.about ?? "");
    }
  }, [currentUser, isOpen]);

  function onChangeNameHandler(ev) {
    setName(ev.target.value);
  }

  function onChangeDescription(ev) {
    setDescription(ev.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          id="name-input"
          type="text"
          placeholder="Имя"
          name="name"
          className="form__input"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={onChangeNameHandler}
        />
        <span className="name-input-error form__input-error">Вы пропустили это поле</span>
      </label>
      <label className="form__field">
        <input
          id="speciality-input"
          type="text"
          placeholder="Род деятельности"
          name="speciality"
          className="form__input"
          required
          minLength="2"
          maxLength="40"
          value={description}
          onChange={onChangeDescription}
        />
        <span className="speciality-input-error form__input-error">Вы пропустили это поле</span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
