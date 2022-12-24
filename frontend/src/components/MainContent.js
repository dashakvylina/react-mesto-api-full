import "../index.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { useHistory } from "react-router-dom";

function MainContent({ updateUser, email, resetLogedIn }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);


  const [cards, setCards] = useState([]);
  const history = useHistory();

  const signOut = () => {
    history.push("/signin");
    updateUser(null);
    resetLogedIn();
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => currentUser && i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then((res) => {
        setCards((prevCards) => {
          return prevCards.filter((c) => c._id !== id);
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    // api
    //   .fetchUser()
    //   .then((res) => {
    //     setCurrentUser(res);
    //   })
    //   .catch((err) => console.log(err));
    api
      .fetchCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const onEditProfileHandle = () => {
    setIsEditProfilePopupOpen(true);
  };

  const onAddPlaceHandle = () => {
    setIsAddPlacePopupOpen(true);
  };

  const onEditAvatarHandle = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  };

  const handleUpdateUser = (newUser) => {
    api
      .editProfile(newUser.name, newUser.about)
      .then((res) => {
        updateUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (link) => {
    api
      .editAvatar(link)
      .then((res) => {
        updateUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleCreateCard = (name, link) => {
    api
      .createCard(name, link)
      .then((res) => {
        setCards((prevCards) => [res, ...prevCards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="page">
      <Header
        rightContent={
          <div className="userinfo">
            <span> {email}</span>
            <button onClick={signOut}>Выйти</button>
          </div>
        }
      />
      <Main
        onEditProfile={onEditProfileHandle}
        onAddPlace={onAddPlaceHandle}
        onEditAvatar={onEditAvatarHandle}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCreateCard={handleCreateCard}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
    </div>
  );
}

export default MainContent;
