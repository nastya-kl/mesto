const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function disableSubmit(event) {
  event.preventDefault();
};

function checkInputValidity(event, config) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`.${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  };
};

function addInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  toggleButton(inputList, config, submitButton);

  inputList.forEach(function (item) {
    item.addEventListener('input', (event) => {
      checkInputValidity(event, config);
      toggleButton(inputList, config, submitButton);
    });
  });
};

function hasInvalidInput(inputList, config) {
  const inputElement = document.querySelector(config.inputSelector);

  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButton(inputList, config, submitButton) {
  if (hasInvalidInput(inputList, config)) {
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.removeAttribute('disabled');
  }
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', disableSubmit);
    addInputListeners(form, config);
  });
};

enableValidation(formValidationConfig);
