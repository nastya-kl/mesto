import Card from './moudls/Card.js';
import FormValidator from './moudls/FormValidator.js';
import Section from './moudls/Section.js';
import Popup from './moudls/Popup.js';
import PopupWithImage from './moudls/PopupWithImage.js';
import PopupWithForm from './moudls/PopupWithImage.js';
import UserInfo from './moudls/UserInfo.js';

import {
  initialCards,
  formValidationConfig,
  popupInfo,
  editButton,
  formInfo,
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  popupAdd,
  addButton,
  formAdd,
  imageNameInput,
  imageLinkInput,
  cardsContainer,
  popupImage } from './utils/constants.js'

// const infoPopup = new Popup(popupInfo);
// const addPopup = new Popup(popupAdd);
const imagePopup = new PopupWithImage(popupImage);
const userInfo = new UserInfo(profileName, profileDescription);

const infoPopupForm = new PopupWithForm(
  popupInfo,
  {handleFormSubmit: (name, job) => {
    userInfo.setUserInfo(name, job);
  }
});

infoPopupForm.setEventListeners();

// Открытие окна редактирования информации профиля
editButton.addEventListener('click', () => {
  infoPopupForm.openPopup();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  profileInfoValidation.resetFormValidation();

});

// Отображение карточек
const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: (link, name) => {
      imagePopup.openPopup(link, name);
    }
  },
  '#elements-template');

  const cardElement = card.generateCard();
  return cardElement;
};

imagePopup.setEventListeners();

// Добавление 6 изначальных карточек
const defaultCards = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCards.addItem(createCard(item))
  }
}, cardsContainer
)

defaultCards.renderCards(initialCards);

// Добавление новой карточки с картинкой

const addPopupForm = new PopupWithForm(
  popupAdd,
  {handleFormSubmit: (data) => {
    createCard(data);
  }
});

addPopupForm.setEventListeners();

// Открытие окна добавления карточки
addButton.addEventListener('click', () => {
  addPopupForm.openPopup();
  photoAddingValidation.resetFormValidation();
});

const profileInfoValidation = new FormValidator(formValidationConfig, popupInfo);
profileInfoValidation.enableValidation();

const photoAddingValidation = new FormValidator(formValidationConfig, popupAdd);
photoAddingValidation.enableValidation();
