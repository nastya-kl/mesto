export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  // Метод получения спана конкретного инпута
  _getErrorElement(input) {
    return this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
  }

  // Метод удаления текста ошибки
  _hideInputError = (input) => {
    input.classList.remove(this._config.inputErrorClass);
    this._getErrorElement(input).textContent = '';
  }

// Метод появления текста ошибки
  _showInputError = (input) => {
    input.classList.add(this._config.inputErrorClass);
    this._getErrorElement(input).textContent = input.validationMessage;
  }

  // Проверка валидации
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    };
  };

  // Метод выявления невалидного инпута
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Метод отключения и включения кнопки
  _toggleButton() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.removeAttribute('disabled');
    }
  };

  // Навешиваем слушатели
  _addInputListeners() {
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButton();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  };

  // Сброс формы после закрытия
  resetFormValidation() {
    this._toggleButton();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  };

  enableValidation() {
    this._addInputListeners();
  };
}

