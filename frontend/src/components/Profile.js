import React, {useState, useEffect} from 'react';
import Header from "./Header";
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

export default function Profile(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleUpdateUser(data) {
    Api.editProfile(data)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }
  function handleUpdateAvatar(data) {
    Api.editAvatar(data.avatar)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }
  function handleAddPlaceSubmit(data) {
    Api.addCard(data)
    .then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const requestLike = res => {
      setCards(cards.map(item => item._id === card._id ? res : item));
    }
    if(!isLiked) {
      Api.likeCard(card._id)
      .then(res => {
        requestLike(res);
      })
      .catch(err => console.log(err))
    } else {
      Api.deleteLikeCard(card._id)
      .then(res => {
        requestLike(res);
      })
      .catch(err => console.log(err))
    }
  }
  function handleCardDelete(card) {
    Api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter(item => item._id !== card._id));
    })
    .catch(err => console.log(err))
  }
  useEffect(() => {
    Promise.all([
      Api.infoProfile(),
      Api.getInitialCards()
    ])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={props.userEmail} />
      <Main
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      cards={cards}
      />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <PopupWithForm title="Вы уверены?" name="delete" buttonText='Да' buttonSelector="popup__submit_type_delete" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
  </CurrentUserContext.Provider>
  );
}