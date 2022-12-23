import React from "react";
import trash from "../images/Group.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser && card && card.owner && card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  const handleLikeClick = (ev) => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  };


  return (
    <div className="element">
      {isOwn && (
        <button className="element__trash-btn" onClick={handleDeleteClick}>
          <img src={trash} className="element__trash-img" alt="Корзина" />
        </button>
      )}
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="element__group">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-group">
          <button
            className={`element__like-btn  ${isLiked ? "element__like-btn_active" : ""}`}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-sum">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
