import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  formValidationConfig,
  popupInfo,
  editButton,
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  popupAdd,
  addButton,
  cardsContainer,
  popupImage } from '../utils/constants.js'

const imagePopup = new PopupWithImage(popupImage);
const userInfo = new UserInfo(profileName, profileDescription);

// Экземпляр класса PopupWithForm для окна редактирования профиля
const infoPopupForm = new PopupWithForm(
  popupInfo,
  {handleFormSubmit: ({name, job}) => {
    userInfo.setUserInfo({name, job});
  }
});

infoPopupForm.setEventListeners();

// Открытие окна редактирования профиля
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

// Экземпляр класса PopupWithForm для окна добавления картинки
const addPopupForm = new PopupWithForm(
  popupAdd,
  {handleFormSubmit: (data) => {
    defaultCards.addItem(createCard(data));
  }
});

addPopupForm.setEventListeners();

// Открытие окна добавления картинки
addButton.addEventListener('click', () => {
  addPopupForm.openPopup();
  photoAddingValidation.resetFormValidation();
});

// Валидация форм
const profileInfoValidation = new FormValidator(formValidationConfig, popupInfo);
profileInfoValidation.enableValidation();

const photoAddingValidation = new FormValidator(formValidationConfig, popupAdd);
photoAddingValidation.enableValidation();
