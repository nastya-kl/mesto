import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, {handleFormSubmit}) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submitButton = this._popupForm.querySelector('.popup__form-button');
    this._formValues = {};
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }

  _getInputValues() {
    this._inputList.forEach(input=> {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  buttonIsLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Сохранить'
    }
 }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) =>{
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }
}
