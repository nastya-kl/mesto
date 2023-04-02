import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';
import Api from '../components/Api';

import {
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
  profileAvatar,
  profileAvatarContainer,
  popupDeleteCard } from '../utils/constants.js'

const imagePopup = new PopupWithImage(popupImage);
const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

let userId;

// Валидация форм
const profileInfoValidation = new FormValidator(formValidationConfig, popupInfo);
profileInfoValidation.enableValidation();

const photoAddingValidation = new FormValidator(formValidationConfig, popupAdd);
photoAddingValidation.enableValidation();

const avatarChangeValidation = new FormValidator(formValidationConfig, popupAvatar);
avatarChangeValidation.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'c459a7d9-2d92-4209-961a-1eacde45ecb4',
    'Content-Type': 'application/json'
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setProfileInfo(userData);
    userId = userData._id;
    defaultCards.renderCards(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })


// Попап подтерждения удаления карточки
const popupConfirmDelete = new PopupConfirmDelete(popupDeleteCard);

popupConfirmDelete.setEventListeners();

// Отображение карточек
const createCard = (item) => {
  const card = new Card({
    data: item,
    ownerId: item.owner._id,
    userId: userId,
    handleCardClick: (link, name) => {
      imagePopup.openPopup(link, name);
    },
    handleDeleteIconClick: () => {
      popupConfirmDelete.openPopup();
      popupConfirmDelete.setSubmitAction(() => {
        api.deleteCard(card.getCardId())
          .then(() => {
            card.deleteCard();
            popupConfirmDelete.closePopup();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      })
    },
    handleLikeIconClick: () => {
      if(card.cardIsLiked()) {
        api.removeLike(card.getCardId())
          .then((data) => {
            card.updateLikeNumbers(data.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      } else {
        api.putLike(card.getCardId())
          .then((data) => {
            card.updateLikeNumbers(data.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      }
    }
  },
  '#elements-template');

  const cardElement = card.generateCard();
  return cardElement;
};

imagePopup.setEventListeners();

// Экземпляр класса Section
const defaultCards = new Section({
  renderer: (item) => {
    defaultCards.addItem(createCard(item));
  }
}, cardsContainer
)

// Экземпляр класса PopupWithForm для окна изменения аватара
const avatarChangeForm = new PopupWithForm(
  popupAvatar,
  {handleFormSubmit: (data) => {
    avatarChangeForm.renderLoading(true);
    api.changeUserAvatar(data)
      .then((data) => {
        userInfo.changeProfileAvatar(data.avatar);
        avatarChangeForm.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        avatarChangeForm.renderLoading(false);
      })
  }}
);

avatarChangeForm.setEventListeners();

// Открытие окна изменения аватара
profileAvatarContainer.addEventListener('click', () => {
  avatarChangeForm.openPopup();
  avatarChangeValidation.resetFormValidation();
});


// Экземпляр класса PopupWithForm для окна добавления картинки
const addPopupForm = new PopupWithForm(
  popupAdd,
  {handleFormSubmit: (data) => {
    addPopupForm.renderLoading(true);
    api.addNewCard(data)
      .then((res) => {
        defaultCards.addNewItem(createCard(res));
        addPopupForm.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addPopupForm.renderLoading(false);
      })
  }}
);

addPopupForm.setEventListeners();

// Открытие окна добавления картинки
addButton.addEventListener('click', () => {
  addPopupForm.openPopup();
  photoAddingValidation.resetFormValidation();
});

// Экземпляр класса PopupWithForm для окна редактирования профиля
const infoPopupForm = new PopupWithForm(
  popupInfo,
  {handleFormSubmit: (data) => {
    infoPopupForm.renderLoading(true);
    api.changeUserInfo(data)
      .then((data) => {
        userInfo.setProfileInfo(data);
        infoPopupForm.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        infoPopupForm.renderLoading(false);
      })
  }
});

infoPopupForm.setEventListeners();

// Открытие окна редактирования профиля
editButton.addEventListener('click', () => {
  infoPopupForm.openPopup();
  infoPopupForm.setInputValues(userInfo.getProfileInfo());
  profileInfoValidation.resetFormValidation();
});
