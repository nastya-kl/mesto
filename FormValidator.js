const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _disableSubmit(event) {
    event.preventDefault();
  };

  _checkInputValidity(event) {
    this._input = event.target;
    this._inputId = this._input.id;
    this._errorElement = document.querySelector(`.${this._inputId}-error`);

    if (this._input.validity.valid) {
      this._input.classList.remove(this._config.inputErrorClass);
      this._errorElement.textContent = '';
    } else {
      this._input.classList.add(this._config.inputErrorClass);
      this._errorElement.textContent = this._input.validationMessage;
    };
  };

  _hasInvalidInput(inputList) {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButton() {
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);

    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.removeAttribute('disabled');
    }
  };

  _addInputListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));

    this._toggleButton();

    this._inputList.forEach((item) => {
      item.addEventListener('input', (event) => {
        this._checkInputValidity(event);
        this._toggleButton();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', this._disableSubmit);
    this._addInputListeners();
  };
}

export { FormValidator, formValidationConfig }
