import React, { useEffect, useState } from "react";
import api from "../utils/api";
import edit from "../images/edit.png";
import plus from "../images/plus.png";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const cardHandleClick = (card) => {
    onCardClick(card);
  };

  return (
    <main>
      <div className="profile">
        <div className="profile__information">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img
              src={currentUser !== null ? currentUser.avatar : undefined}
              className="profile__avatar"
              alt="аватар"
            />
          </div>
          <div className="profile__person">
            <div className="profile__group">
              <h1 className="profile__text-name">{currentUser !== null && currentUser.name}</h1>
              <button className="profile__edit-button" onClick={onEditProfile} type="button">
                <img src={edit} alt="редактировать" />
              </button>
            </div>
            <p className="profile__text-about">{currentUser !== null && currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button">
          <img src={plus} alt="Добавить фото" />
        </button>
      </div>

      <div className="elements">
        {cards.map((card, idx) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={cardHandleClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Main;
