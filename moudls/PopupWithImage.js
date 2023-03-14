import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._bigImage = document.querySelector('.popup__card-image');
    this._imageCaption = document.querySelector('.popup__image-caption');
  }

  openPopup(link, name) {
    this._bigImage.src = link;
    this._bigImage.alt = name;
    this._imageCaption.textContent = name;
    super.openPopup();
  }
}
