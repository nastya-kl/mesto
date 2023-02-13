const initialCards = [
  {
    name: 'Байкал',
    link: 'https://i.ibb.co/mqjkNcK/Baikal.png',
    alt: 'Фото квадрациклов на льду Байкала'
  },
  {
    name: 'Ольхон',
    link: 'https://i.ibb.co/p3B2q7q/Olkhon-island.png',
    alt: 'Остров Ольхон'
  },
  {
    name: 'Саяны',
    link: 'https://i.ibb.co/TPWVsnp/Sayan-mountains.png',
    alt: 'Горы Саяны с высоты птичьего полёта'
  },
  {
    name: 'Камчатка',
    link: 'https://i.ibb.co/Syfhdfd/Kamchatka.png',
    alt: 'Побережье Камчатки'
  },
  {
    name: 'Эльбрус',
    link: 'https://i.ibb.co/3R7QC48/Elbrus.png',
    alt: 'Велосипедист на фоне горы Эльбрус'
  },
  {
    name: 'Мурманск',
    link: 'https://i.ibb.co/n3d3m0k/Murmansk.png',
    alt: 'Цветы на фоне заката в Мурманске'
  }
];

// Добавление инф-ции профиля
const popupInfo = document.querySelector('.popup_info');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = popupInfo.querySelector('.popup__close-icon');
const formInfo = popupInfo.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Добавление карточек сфото
const popupAdd = document.querySelector('.popup_add');
const addButton = document.querySelector('.profile__add-button')
const closeAddButton = popupAdd.querySelector('.popup__close-icon')
const formAdd = popupAdd.querySelector('.popup__form');
const imageNameInput = document.querySelector('.popup__input_type_image-name');
const imageLinkInput = document.querySelector('.popup__input_type_image-link');
const cardHeading = document.querySelector('.element__heading');
const cardImage = document.querySelector('.element__image');

// Открытие попап с фото
const popupImage = document.querySelector('.popup_image');
const closeImageButton = popupImage.querySelector('.popup__close-icon');
const cardImageLarge = document.querySelector('.popup__card-image');
const imageCaption = document.querySelector('.popup__image-caption');

// Функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc)
};

// Функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc)
};

// Закрытие попапа по нажатию на оверлей и кнопку крестика
const allPopups = document.querySelectorAll('.popup')

allPopups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    } else if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup);
    };
  });
});

// Закрытие попапа по нажатию на Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  };
};

function resetFormValidation(popup) {
  if (popupInfo.classList.contains('popup_opened') || popupAdd.classList.contains('popup_opened')) {
    const formButton = popup.querySelector('.popup__form-button');
    const formInputs = Array.from(popup.querySelectorAll('.popup__input'));
    const formErrors = Array.from(popup.querySelectorAll('.popup__input-error'));

    formButton.setAttribute('disabled', true);

    formInputs.forEach((input) => {
      input.classList.remove('popup__input_type_error');
    });

    formErrors.forEach((error) => {
      error.textContent = '';
    });
  };
};

// Открытие окна редактирования информации профиля
editButton.addEventListener('click', function () {
  openPopup(popupInfo);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  resetFormValidation(popupInfo);
});

// Отправка формы по нажатию кнопки Сохранить
function handleFormPopupInfoSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(popupInfo);
}

formInfo.addEventListener('submit', handleFormPopupInfoSubmit);

// Отображение карточек
const cardsContainer = document.querySelector('.elements__container');
const cardsTemplate = document.querySelector('#elements-template').content;

const createCard = (element) => {
  const cardElement = cardsTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');

  cardElement.querySelector('.element__heading').textContent = element.name;
  elementImage.src = element.link;
  elementImage.alt = element.alt;

  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });

  const deleteButton = cardElement.querySelector('.element__delete-button');
  const handleDeleteCard = (evt) => {
    evt.target.closest('.element').remove();
  };

  deleteButton.addEventListener('click', handleDeleteCard);

  cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
    openPopup(popupImage);
    cardImageLarge.src = evt.target.src;
    cardImageLarge.alt = evt.target.alt;
    imageCaption.textContent = evt.target.closest('.element').textContent;
  });

  return cardElement;
};

// Добавление карточки
const renderInitialCard = (element) => {
  cardsContainer.append(createCard(element));
};

// Добавление 6 изначальных карточек
initialCards.forEach((item) => {
  renderInitialCard(item);
});

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
  formAdd.reset();
  openPopup(popupAdd);
  resetFormValidation(popupAdd);
});

// Отправка формы по нажатию кнопки Создать (добавление карточки)
function handleFormSubmitPopupAdd (evt) {
  evt.preventDefault();

  const newCard = {name: imageNameInput.value, link: imageLinkInput.value, alt: imageNameInput.value};
  cardsContainer.prepend(createCard(newCard));

  closePopup(popupAdd);
};

formAdd.addEventListener('submit', handleFormSubmitPopupAdd);
