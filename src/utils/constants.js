const initialCards = [
  {
    name: 'Байкал',
    link: 'https://i.ibb.co/mqjkNcK/Baikal.png',
  },
  {
    name: 'Ольхон',
    link: 'https://i.ibb.co/p3B2q7q/Olkhon-island.png',
  },
  {
    name: 'Саяны',
    link: 'https://i.ibb.co/TPWVsnp/Sayan-mountains.png',
  },
  {
    name: 'Камчатка',
    link: 'https://i.ibb.co/Syfhdfd/Kamchatka.png',
  },
  {
    name: 'Эльбрус',
    link: 'https://i.ibb.co/3R7QC48/Elbrus.png',
  },
  {
    name: 'Мурманск',
    link: 'https://i.ibb.co/n3d3m0k/Murmansk.png',
  }
];

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
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Добавление карточек сфото
const popupAdd = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button')
const cardsContainer = document.querySelector('.elements__container');
const popupImage = document.querySelector('.popup_type_image')

export {
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
  popupImage
};
