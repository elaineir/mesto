export default class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElem = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach(inputElem => inputElem.addEventListener('input', () => {
      this._checkInputValidity(inputElem);
      this._toggleButtonState();
    }));
  }

  _showInputError(inputElem, errorMessage) {
    this._errorElem = this._form.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(this._inputErrorClass);
    this._errorElem.textContent = errorMessage;
    this._errorElem.classList.add(this._errorClass);
  }

  _hideInputError(inputElem) {
    this._errorElem = this._form.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(this._inputErrorClass);
    this._errorElem.classList.remove(this._errorClass);
    this._errorElem.textContent = '';
  }

  _checkInputValidity(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElem => !inputElem.validity.valid);
  }
      
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElem.classList.add(this._inactiveButtonClass);
      this._buttonElem.disabled = true;
    } else {
      this._buttonElem.classList.remove(this._inactiveButtonClass);
      this._buttonElem.disabled = false;
    }
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
