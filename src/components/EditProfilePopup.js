import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"type_profile"}
      title={"Редактировать профиль"}
      titleBtn={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          className="popup__field popup__field_type_name"
          id="input-name"
          type="text"
          name="name"
          value={name || ''}
          onChange={handleChangeName}
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
          value={description || ''}
          onChange={handleChangeDescription}
          placeholder="Род деятельности"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__validation-error" id="input-about-error" />
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;