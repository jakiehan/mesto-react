import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const App = () => {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPreloaderBtn, setIsPreloaderBtn] = useState(false);

  const [cardToDelete, setCardToDelete] = useState({});

  const [selectedCard, setSelectedCard] = useState({});

  const [cards, setCards] = useState([]);



  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    })
  },[])

  const handleUpdateUser = (inputData) => {
    setIsPreloaderBtn(true);
    api.setUserInfo(inputData)
      .then((UserInfo) => {
        setCurrentUser(UserInfo);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleUpdateAvatar = (avatarUrl) => {
    setIsPreloaderBtn(true);
    api.setUserAvatar(avatarUrl)
      .then((UserAvatar) => {
        setCurrentUser(UserAvatar);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleAddPlaceSubmit = (inputData) => {
    setIsPreloaderBtn(true);
    api.uploadCard(inputData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      }).catch(err => {
      console.log(`Ошибка: ${ err }`);
    })
  }

  const handleCardDelete = (card) => {
    setIsPreloaderBtn(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((stateCard) => stateCard._id !== card._id && stateCard));
        closeAllPopups();
      }).catch(err => {
      console.log(`Не удалось удалить фото-карточку ${ err }`);
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  // const checkInputValidity = (e, obj) => {
  //   if (obj === value) {
  //     if (!e.target.validity.valid) {
  //       setIsValidName(false);
  //       setErrorMessageName(e.target.validationMessage);
  //     } else {
  //       setIsValidName(true);
  //       setErrorMessageName('');
  //     }
  //   } else {
  //     if (!e.target.validity.valid) {
  //       setIsValidAbout(false);
  //       setErrorMessageAbout(e.target.validationMessage);
  //     } else {
  //       setIsValidAbout(true);
  //       setErrorMessageAbout('');
  //     }
  //   }
  // }

  const handleCardClick = (card) => setSelectedCard(card);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleDeletePlaceClick = (place) => setCardToDelete(place);


  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setCardToDelete({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          isCards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeletePlaceClick}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isPreloader={isPreloaderBtn}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isPreloader={isPreloaderBtn}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUploadCard={handleAddPlaceSubmit}
          isPreloader={isPreloaderBtn}
        />
        <DeletePlacePopup
          card={cardToDelete}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isPreloader={isPreloaderBtn}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
