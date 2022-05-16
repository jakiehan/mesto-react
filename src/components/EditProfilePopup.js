import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isPreloader }) => {

  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({});
  const [isValidName, setIsValidName] = useState(true);
  const [isValidAbout, setIsValidAbout] = useState(true);
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageAbout, setErrorMessageAbout] = useState('');

  const errorClsInputName = errorMessageName && 'popup__field_type_error';
  const errorClsInputAbout = errorMessageAbout && 'popup__field_type_error';

  const isValidBtn = isValidName && isValidAbout && true;

  const handleChange = (e) => {
    const { name, value } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: value
    }))

    if (name === "name") {
      if (!e.target.validity.valid) {
        setIsValidName(false);
        setErrorMessageName(e.target.validationMessage);
      } else {
        setIsValidName(true);
        setErrorMessageName('');
      }
    } else {
      if (!e.target.validity.valid) {
        setIsValidAbout(false);
        setErrorMessageAbout(e.target.validationMessage);
      } else {
        setIsValidAbout(true);
        setErrorMessageAbout('');
      }
    }
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
    setErrorMessageName('')
    setErrorMessageAbout('')
    setIsValidName(true)
    setIsValidAbout(true)
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name={"type_profile"}
      title={"Редактировать профиль"}
      btnTitle={"Сохранить"}
      preloaderBtnTitle={"Сохранение..."}
      btnIsValid={isValidBtn}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    >
      <div className="popup__input-wrapper">
        <input
          className={`popup__field popup__field_type_name ${errorClsInputName}`}
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
        <span className="popup__validation-error" id="input-name-error">
          {errorMessageName}
        </span>
      </div>
      <div className="popup__input-wrapper">
        <input
          className={`popup__field popup__field_type_rank ${errorClsInputAbout}`}
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
        <span className="popup__validation-error" id="input-about-error">
          {errorMessageAbout}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;