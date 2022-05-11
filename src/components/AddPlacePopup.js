import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

const AddPlacePopup = ({ isOpen, onClose, onUploadCard, isPreloader }) => {

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

    onUploadCard({
      name: values.name,
      link: values.link,
    });
  }

  useEffect(() => {
    setValues({})
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"type_card"}
      title={"Новое место"}
      btnTitle={"Создать"}
      preloaderBtnTitle={"Создание..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    >
      <div className="popup__input-wrapper">
        <input
          className="popup__field popup__field_type_title"
          id="input-title"
          type="text"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
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
          value={values.link || ''}
          onChange={handleChange}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__validation-error" id="input-link-error" />
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;