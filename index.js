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
const popupInfo = document.querySelector('.popup__info');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = popupInfo.querySelector('.popup__close-icon');
const formInfo = popupInfo.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Добавление карточек сфото
const popupAdd = document.querySelector('.popup__add');
const addButton = document.querySelector('.profile__add-button')
const closeAddButton = popupAdd.querySelector('.popup__close-icon')
const formAdd = popupAdd.querySelector('.popup__form');
const imageNameInput = document.querySelector('.popup__input_type_image-name');
const imageLinkInput = document.querySelector('.popup__input_type_image-link');
const cardHeading = document.querySelector('.element__heading');
const cardImage = document.querySelector('.element__image');

// Открытие попап с фото
const popupImage = document.querySelector('.popup__image');
const closeImageButton = popupImage.querySelector('.popup__close-icon');
const cardImageLarge = document.querySelector('.popup__card-image');
const imageCaption = document.querySelector('.popup__image-caption');

// Функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

// Открытие окна редактирования информации профиля
editButton.addEventListener('click', function () {
  openPopup(popupInfo);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

// Закрытие окна редактирования информации профиля
closeEditButton.addEventListener('click', function() {
  closePopup(popupInfo);
});

// Отправка формы по нажатию кнопки Сохранить
function handleFormSubmitPopupInfo (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(popupInfo);
}

formInfo.addEventListener('submit', handleFormSubmitPopupInfo);

// Отображение карточек
const cardsContainer = document.querySelector('.elements__container');
const cardsTemplate = document.querySelector('#elements-template').content;

const createCard = (element) => {
  const cardElement = cardsTemplate.cloneNode(true);

  cardElement.querySelector('.element__heading').textContent = element.name;
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.alt;

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
    imageCaption.textContent = evt.target.alt;
  });

  closeImageButton.addEventListener('click', function() {
    closePopup(popupImage);
  });

  return cardElement;
};

// Добавление карточки
const renderCard = (element) => {
  cardsContainer.append(createCard(element));
};

// Добавление 6 изначальных карточек
initialCards.forEach((item) => {
  renderCard(item);
});

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

// Закрытие окна добавления карточки
closeAddButton.addEventListener('click', function() {
  closePopup(popupAdd);
  imageNameInput.value = '';
  imageLinkInput.value = '';
});

// Отправка формы по нажатию кнопки Создать (добавление карточки)
function handleFormSubmitPopupAdd (evt) {
  evt.preventDefault();

  const newCard = {name: imageNameInput.value, link: imageLinkInput.value, alt: imageNameInput.value};
  cardsContainer.prepend(createCard(newCard));

  closePopup(popupAdd);
  imageNameInput.value = '';
  imageLinkInput.value = '';
};

formAdd.addEventListener('submit', handleFormSubmitPopupAdd);
