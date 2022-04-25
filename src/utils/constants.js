export const documentSelectors = {
  galleryElements: '.gallery__elements',
  template: '.element-template',
  profileName: '.profile__name',
  profileAbout: '.profile__rank',
  profileAvatar: '.profile__avatar',
};

export const popupSelectors = {
  popupEditProfile: '.popup_edit-profile',
  popupPhotoCard: '.popup_photo-card',
  popupEditAvatar: '.popup_edit-avatar',
  popupDeleteCard: '.popup_delete-card',
  popupViewForm: '.popup_viewing-photo',
}

export const popupFormSelectors = {
  popupFormProfile: '.popup__form_type_profile',
  popupFormCard: '.popup__form_type_card',
  popupFormAvatar: '.popup__form_type_avatar',
}

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileAvatarEdit = document.querySelector('.profile__avatar-edit');

export const popupFieldName = document.querySelector('.popup__field_type_name');
export const popupFieldRank = document.querySelector('.popup__field_type_rank');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__btn-s',
  inputErrorClass: 'popup__field_type_error',
  inactiveButtonClass: 'popup__btn-s_atr_disabled',
  errorMessageSelector: '.popup__validation-error'
};

export const apiOptions = {
  url: 'https://nomoreparties.co/v1/cohort-38/',
  token: '65c30779-9ea9-44cb-b8d2-edc42f5a7e98'
}
