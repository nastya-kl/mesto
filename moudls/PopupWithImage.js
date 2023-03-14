import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._bigImage = document.querySelector('.popup__card-image');
    this._imageCaption = document.querySelector('.popup__image-caption');
  }

  openPopup(data) {
    this._bigImage.scr = data.link;
    this._bigImage.alt = data.name;
    this._imageCaption.textContent = data.name;
    super.openPopup();
  }
}
