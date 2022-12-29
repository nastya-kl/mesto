// Появление popup //

let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

function showClickEditButton() {
  popup.style.display = 'flex';
};

editButton.addEventListener('click', showClickEditButton);

// Закрытие popup //

let closeButton = document.querySelector('.close-icon')

function showClickCloseButton() {
  popup.style.display = 'none';
};

closeButton.addEventListener('click', showClickCloseButton);

// Изменение текста в профиле //

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.profile-name');
let jobInput = document.querySelector('.profile-job');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    showClickCloseButton();
}

formElement.addEventListener('submit', handleFormSubmit);
