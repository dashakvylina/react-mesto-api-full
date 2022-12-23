import closeIcon from "../images/Close_Icon.png";

const PopupWithForm = ({ name, title, children, isOpen, onClose, btnText, onSubmit }) => {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_visible" : ""}`}>
      <div className="popup__window">
        <h3 className="popup__title">{title}</h3>
        <form className="form" name={name} method="get" noValidate onSubmit={onSubmit}>
          {children}
          <button type="submit" className="form__button">
            {btnText || "Сохранить"}
          </button>
        </form>
        <button className="popup__close-btn" onClick={onClose} type="button">
          <img src={closeIcon} className="popup__close-icon" alt="Закрыть" />
        </button>
      </div>
    </div>
  );
};

export default PopupWithForm;
