import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
//import DeletePlacePopup from './DeletePlacePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const App = () => {

  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    })
  },[])

  const handleUpdateUser = (inputData) => {
    api.setUserInfo(inputData)
      .then((UserInfo) => {
        setCurrentUser(UserInfo);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    })
  }

  const handleUpdateAvatar = (avatarUrl) => {
    api.setUserAvatar(avatarUrl)
      .then((UserAvatar) => {
        setCurrentUser(UserAvatar);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    })
  }

  const handleAddPlaceSubmit = (inputData) => {
    api.uploadCard(inputData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
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
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((stateCard) => stateCard._id !== card._id && stateCard));
      }).catch(err => {
      console.log(`Не удалось удалить фото-карточку ${ err }`);
    })
  }

  const handleCardClick = (card) => setSelectedCard(card);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
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
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUploadCard={handleAddPlaceSubmit}
        />
        {/*<DeletePlacePopup*/}
        {/*  isOpen={isDeletePlacePopupOpen}*/}
        {/*  onClose={closeAllPopups}*/}
        {/*  onDeletePlace={handleCardDelete}*/}
        {/*/>*/}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
