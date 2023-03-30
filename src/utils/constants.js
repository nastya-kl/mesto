const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Добавление инф-ции профиля
const popupInfo = document.querySelector('.popup_type_info');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Добавление карточек сфото
const popupAdd = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button')
const cardsContainer = document.querySelector('.elements__container');
const popupImage = document.querySelector('.popup_type_image')

// Смена аватара и подтверждение удаления карточки
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarContainer = document.querySelector('.profile__avatar-container');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupDeleteCard = document.querySelector('.popyp_type_confirm')

export {
  formValidationConfig,
  popupInfo,
  editButton,
  profileName,
  profileDescription,
  popupAdd,
  addButton,
  cardsContainer,
  popupImage,
  popupAvatar,
  popupDeleteCard,
  profileAvatar,
  profileAvatarContainer
};
