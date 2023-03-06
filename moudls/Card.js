export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._link = data.link;
    this._alt = data.alt;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
    this._popupImage = document.querySelector('.popup_image');
    this._bigImage = document.querySelector('.popup__card-image');
    this._imageCaption = document.querySelector('.popup__image-caption');
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._heading = this._element.querySelector('.element__heading');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._heading.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _likeCard() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null
  }

  _openImagePopup() {
    this._openPopup(this._popupImage);

    this._bigImage.src = this._link;
    this._bigImage.alt = this._name;
    this._imageCaption.textContent = this._name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._image.addEventListener('click',  () => {
      this._openImagePopup();
    });
  }
}
