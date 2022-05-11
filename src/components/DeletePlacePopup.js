import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const DeletePlacePopup = ({ card, onClose, onCardDelete, isPreloader }) => {

  const isOpen = card._id && true;

  const handleSubmit = () => {
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name={"type_delete-card"}
      title={"Вы уверены?"}
      btnTitle={"Да"}
      preloaderBtnTitle={"Удаление..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    />
  )
}

export default DeletePlacePopup;