class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
  }

  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const buttonElem = form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElem);

    inputList.forEach(inputElem => inputElem.addEventListener('input', () => {
      this._checkInputValidity(form, inputElem);
      this._toggleButtonState(inputList, buttonElem);
    }));
  }

  _showInputError(form, inputElem, errorMessage) {
    const errorElem = form.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(this._inputErrorClass);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(this._errorClass);
  }

  _hideInputError(form, inputElem) {
    const errorElem = form.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(this._inputErrorClass);
    errorElem.classList.remove(this._errorClass);
    errorElem.textContent = '';
  }

  _checkInputValidity(form, inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(form, inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(form, inputElem);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElem => !inputElem.validity.valid);
  }
      
  _toggleButtonState(inputList, buttonElem) {
    if (this._hasInvalidInput(inputList)) {
      buttonElem.classList.add(this._inactiveButtonClass);
      buttonElem.disabled = true;
    } else {
      buttonElem.classList.remove(this._inactiveButtonClass);
      buttonElem.disabled = false;
    }
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners(this._form);
  }
}

export default FormValidator;
