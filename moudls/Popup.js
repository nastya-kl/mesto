export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._popupCloseButton = document.querySelector('popup__close-icon');
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._popup
      .querySelector('.popup__close-icon')
      .addEventListener('click', () => {
        this.closePopup();
      });



    this._popup.addEventListener('moussedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup();
      }
    });
  }
}
