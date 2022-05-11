import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isPreloader }) => {

  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  useEffect(() => {
    setValues(currentUser);
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name={"type_profile"}
      title={"Редактировать профиль"}
      btnTitle={"Сохранить"}
      preloaderBtnTitle={"Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    >
      <div className="popup__input-wrapper">
        <input
          className="popup__field popup__field_type_name"
          id="input-name"
          type="text"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
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
          value={values.about || ''}
          onChange={handleChange}
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