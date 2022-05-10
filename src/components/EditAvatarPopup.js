import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {

  const [value, setValue] = React.useState('');
  const avatarRef = React.useRef();

  const handleChangeAvatar = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    setValue('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"type_avatar"}
      title={"Обновить аватар"}
      titleBtn={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          className="popup__field popup__field_type_link"
          ref={avatarRef}
          id="input-link-avatar"
          type="url"
          name="avatar"
          value={value || ''}
          onChange={handleChangeAvatar}
          placeholder="Ссылка на фото"
          required
        />
        <span className="popup__validation-error" id="input-link-avatar-error" />
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;