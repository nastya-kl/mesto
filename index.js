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

let cardsContainer = document.querySelector('.elements__container');
let cardsTemplate = document.querySelector('#elements-template').content;
let likeButton = document.querySelector('.element__like-button');

// Функция нажатия на кнопку лайк
const clickLikeButton = () => {
  likeButton.classList.toggle('element__like-button_status_active');
};

initialCards.forEach(function (element) {
  const cardElement = cardsTemplate.cloneNode(true);

  cardElement.querySelector('.element__heading').textContent = element.name;
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.alt;

  likeButton.addEventListener('click', (evt) => clickLikeButton.evt.target);

  cardsContainer.append(cardElement);
});



// Добавление инф-ции профиля
let popupInfo = document.querySelector('.popup_info');
let editButton = document.querySelector('.profile__edit-button');
let closeEditButton = popupInfo.querySelector('.popup__close-icon');
let formInfo = popupInfo.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

// Добавление фото
let popupAdd = document.querySelector('.popup_add');
let addButton = document.querySelector('.profile__add-button')
let closeAddButton = popupAdd.querySelector('.popup__close-icon')
let formAdd = popupAdd.querySelector('.popup__form');
let imageNameInput = document.querySelector('.popup__input_image-name');
let imageLinkInput = document.querySelector('.popup__input_image-link');
let cardHeading = document.querySelector('.element__heading');
let cardImage = document.querySelector('.element__image');

// Объявление функции открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

// Объявление функции закрытия попапа
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

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
  openPopup(popupAdd);

});

// Закрытие окна добавления карточки
closeAddButton.addEventListener('click', function() {
  closePopup(popupAdd);
});


// Отправка формы по нажатию кнопки Создать (добавление карточки)
function handleFormSubmitPopupAdd (evt) {
  evt.preventDefault();



  closePopup(popupAdd);
};

formAdd.addEventListener('submit', handleFormSubmitPopupAdd);
