import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onCreateCard }) {
  const linkRef = useRef(null);
  const nameRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCard(nameRef.current.value, linkRef.current.value);
  };

  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onClose={onClose}
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          id="place-input"
          type="text"
          placeholder="Название"
          name="title"
          className="form__input"
          required
          minLength="2"
          maxLength="30"
          ref={nameRef}
        />
        <span className="place-input-error form__input-error"></span>
      </label>
      <label className="form__field">
        <input
          id="url-input"
          type="url"
          placeholder="Ссылка на картинку"
          name="picture"
          className="form__input"
          required
          ref={linkRef}
        />
        <span className="url-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
