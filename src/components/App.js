import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

const App = () => {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  return (
    <div className="app">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name={"type_profile"}
        title={"Редактировать профиль"}
        titleBtn={"Сохранить"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-wrapper">
          <input
            className="popup__field popup__field_type_name"
            id="input-name"
            type="text"
            name="name"
            value=""
            placeholder="Имя профиля"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__validation-error" id="input-name-error" />
        </div>
        <div className="popup__input-wrapper">
          <input
            className="popup__field popup__field_type_rank"
            id="input-about"
            type="text"
            name="about"
            value=""
            placeholder="Род деятельности"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__validation-error" id="input-about-error" />
        </div>
      </PopupWithForm>
      <PopupWithForm
        name={"type_card"}
        title={"Новое место"}
        titleBtn={"Создать"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-wrapper">
          <input
            className="popup__field popup__field_type_title"
            id="input-title"
            type="text"
            name="name"
            value=""
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__validation-error" id="input-title-error" />
        </div>
        <div className="popup__input-wrapper">
          <input
            className="popup__field popup__field_type_link"
            id="input-link"
            type="url"
            name="link"
            value=""
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__validation-error" id="input-link-error" />
        </div>
      </PopupWithForm>
      <PopupWithForm
        name={"type_avatar"}
        title={"Обновить аватар"}
        titleBtn={"Сохранить"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-wrapper">
          <input
            className="popup__field popup__field_type_link"
            id="input-link-avatar"
            type="url"
            name="avatar"
            value=""
            placeholder="Ссылка на фото"
            required
          />
          <span className="popup__validation-error" id="input-link-avatar-error" />
        </div>
      </PopupWithForm>
      <PopupWithForm
        name={"type_delete-card"}
        title={"Вы уверены?"}
        titleBtn={"Да"}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

    </div>
  );
}

export default App;
