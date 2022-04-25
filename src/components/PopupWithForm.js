import React from 'react';

const PopupWithForm = (props) => {

  return (
     <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        {props.name !== 'type_delete-card'
          ? (
            <form className={`popup__form popup__form_${props.name}`} name="popup-form" noValidate>
              <fieldset className="popup__input-info">
                {props.children}
                <button
                  className={`popup__btn-s popup__btn-s_${props.name} transparency-button transparency-button_opacity_more`}
                  type="submit"
                >
                  {props.titleBtn}
                </button>
              </fieldset>
            </form>
          ) : (
            <button
              className={`popup__btn-s popup__btn-s_${props.name} transparency-button transparency-button_opacity_more`}
              type="submit"
            >
              {props.titleBtn}
            </button>
          )}
        <button
          className={`popup__close-btn popup__close-btn_${props.name} transparency-button`}
          type="button"
          aria-label="Close button"
          onClick={props.onClose}
        >
        </button>
      </div>
    </div>
  )
}

export default PopupWithForm;