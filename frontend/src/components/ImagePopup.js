import closeIcon from "../images/Close_Icon.png";

const ImagePopup = ({ card, onClose, isOpen }) => {
  return (
    <div className={`popup ${isOpen && "popup_visible"}`}>
      <div className="popup__image-group">
        <h5 className="popup__image-text">{card ? card.name : ""}</h5>
        <img src={card?.link} className="popup__image" alt={card ? card.name : ""} />
        <button className="popup__close-btn" onClick={onClose}>
          <img src={closeIcon} className="popup__close-icon" alt="Закрыть" />
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;
