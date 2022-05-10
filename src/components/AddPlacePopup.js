import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const AddPlacePopup = ({ isOpen, onClose, onUploadCard }) => {

  const [title, setTitle] = React.useState('');
  const [photoUrl, setPhotoUrl] = React.useState('');

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangePhotoUrl = (e) => setPhotoUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUploadCard({
      name: title,
      link: photoUrl,
    });
  }

  React.useEffect(() => {
    setTitle('');
    setPhotoUrl('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"type_card"}
      title={"Новое место"}
      titleBtn={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          className="popup__field popup__field_type_title"
          id="input-title"
          type="text"
          name="name"
          value={title || ''}
          onChange={handleChangeTitle}
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
          value={photoUrl || ''}
          onChange={handleChangePhotoUrl}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__validation-error" id="input-link-error" />
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;