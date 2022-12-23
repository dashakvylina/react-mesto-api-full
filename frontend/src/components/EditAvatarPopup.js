import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          id="avatar-input"
          type="url"
          placeholder="Ссылка на картинку"
          name="avatar"
          className="form__input"
          required
          ref={inputRef}
        />
        <span className="avatar-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
