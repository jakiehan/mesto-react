import React from 'react';

const ImagePopup = (props) => {

  return (
    <div className={`popup popup_viewing-photo ${props.card._id && 'popup_opened'}`}>
      <div className="popup__wrapper">
        <figure className="popup__viewing-form">
          <img
            className="popup__image"
            src={`${props.card._id && props.card.link}`}
            alt={props.card.name}
          />
          <figcaption className="popup__image-title">{props.card.name}</figcaption>
        </figure>
        <button
          className="popup__close-btn popup__close-btn_type_view transparency-button"
          type="button"
          aria-label="Close button"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;