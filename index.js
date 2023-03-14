import Card from './moudls/Card.js';
import FormValidator from './moudls/FormValidator.js';
import Section from './moudls/Section.js';
import Popup from './moudls/Popup.js';
import PopupWithImage from './moudls/PopupWithImage.js';

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

const infoPopup = new Popup(popupInfo);
const addPopup = new Popup(popupAdd);
const imagePopup = new PopupWithImage(popupImage);

// Открытие окна редактирования информации профиля
editButton.addEventListener('click', function () {
  infoPopup.openPopup();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  profileInfoValidation.resetFormValidation();
});

// Отправка формы по нажатию кнопки Сохранить
function handleFormSubmitPopupInfo (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    infoPopup.closePopup();
};

formInfo.addEventListener('submit', handleFormSubmitPopupInfo);

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

// Добавление 6 изначальных карточек
const defaultCards = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCards.addItem(createCard(item))
  }
}, cardsContainer
)

defaultCards.renderCards(initialCards);

// Открытие окна добавления карточки
addButton.addEventListener('click', () => {
  formAdd.reset();
  addPopup.openPopup();
  photoAddingValidation.resetFormValidation();
});

// Отправка формы по нажатию кнопки Создать (добавление карточки)
function handleFormSubmitPopupAdd (evt) {
  evt.preventDefault();

  const newCard = {name: imageNameInput.value, link: imageLinkInput.value};
  cardsContainer.prepend(createCard(newCard));

  addPopup.closePopup();
};

formAdd.addEventListener('submit', handleFormSubmitPopupAdd);

const profileInfoValidation = new FormValidator(formValidationConfig, popupInfo);
profileInfoValidation.enableValidation();

const photoAddingValidation = new FormValidator(formValidationConfig, popupAdd);
photoAddingValidation.enableValidation();
