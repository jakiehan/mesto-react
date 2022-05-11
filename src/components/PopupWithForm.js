import React, { useEffect } from 'react';

const PopupWithForm = ({ isOpen, onClose, name, onSubmit, children, btnTitle, title, isPreloader, preloaderBtnTitle, btnIsValid }) => {

  const popupTypeDelete = name === 'type_delete-card';
  const popupTypeAvatar = name === 'type_avatar';
  const btnStatus = isPreloader ? preloaderBtnTitle : btnTitle;
  const btnClsDis = !btnIsValid && popupTypeAvatar && 'popup__btn-s_atr_disabled';
  const btnDis = !btnIsValid && popupTypeAvatar && true;

  useEffect(() => {
    const closeAllPopupsOnEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeAllPopupsOnEscape);
    return () => document.removeEventListener('keydown', closeAllPopupsOnEscape);
  })

  return (
     <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <h3 className={`popup__title ${popupTypeDelete && 'popup__title_margin_bottom'}`}>{title}</h3>
        {!popupTypeDelete
          ? (
            <form
              className={`popup__form popup__form_${name}`}
              name="popup-form"
              onSubmit={onSubmit}
            >
              <fieldset className="popup__input-info">
                {children}
                <button
                  className={`popup__btn-s popup__btn-s_${name} transparency-button transparency-button_opacity_more ${btnClsDis}`}
                  type="submit"
                  disabled={btnDis}
                >
                  {btnStatus}
                </button>
              </fieldset>
            </form>
          ) : (
            <button
              className={`popup__btn-s popup__btn-s_${name} ${popupTypeDelete && 'popup__btn-s_position_center'} transparency-button transparency-button_opacity_more`}
              type="submit"
              onClick={onSubmit}
            >
              {btnStatus}
            </button>
          )}
        <button
          className={`popup__close-btn popup__close-btn_${name} transparency-button`}
          type="button"
          aria-label="Close button"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default PopupWithForm;