import closeIcon from "../images/Close_Icon.png";
import ok from "../images/ok.svg";
import err from "../images/err.svg";

const InfoTooltip = ({ isOpen, onClose, isError, text }) => {
  return (
    <div className={`popup popup-info ${isOpen ? "popup_visible" : ""}`}>
      <div className="popup__window">
        <div className="popup__infotooltip">
          <img src={isError ? err : ok} className="" alt={isError ? "Ошибка" : "Ок"} />
          <h3 className="popup__title">{text}</h3>
        </div>
        <button className="popup__close-btn" onClick={onClose} type="button">
          <img src={closeIcon} className="popup__close-icon" alt="Закрыть" />
        </button>
      </div>
    </div>
  );
};

export default InfoTooltip;
