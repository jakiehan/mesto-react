import React from 'react';

const PopupWithForm = (props) => {

  const popupTypeDelete = props.name === 'type_delete-card';

  return (
     <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h3 className={`popup__title ${popupTypeDelete && 'popup__title_margin_bottom'}`}>{props.title}</h3>
        {!popupTypeDelete
          ? (
            <form
              className={`popup__form popup__form_${props.name}`}
              name="popup-form"
              noValidate
              onSubmit={props.onSubmit}
            >
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
              className={`popup__btn-s popup__btn-s_${props.name} ${popupTypeDelete && 'popup__btn-s_position_center'} transparency-button transparency-button_opacity_more`}
              type="submit"
              onSubmit={props.onSubmit}
            >
              {props.titleBtn}
            </button>
          )}
        <button
          className={`popup__close-btn popup__close-btn_${props.name} transparency-button`}
          type="button"
          aria-label="Close button"
          onClick={props.onClose}
        />
      </div>
    </div>
  )
}

export default PopupWithForm;