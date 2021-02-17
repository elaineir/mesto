'use strict';

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, 
  inactiveButtonClass, inputErrorClass, errorClass }) => {
  
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElem => {
    formElem.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(formElem);
  });

  function setEventListeners(formElem) {
    const inputList = Array.from(formElem.querySelectorAll(inputSelector));

    const buttonElem = formElem.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElem);

    inputList.forEach(inputElem => inputElem.addEventListener('input', () => {
      checkInputValidity(formElem, inputElem);
      toggleButtonState(inputList, buttonElem);
    }));
  }

  function showInputError(formElem, inputElem, errorMessage) {
    const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(inputErrorClass);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(errorClass);
  }

  function hideInputError(formElem, inputElem) {
    const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(inputErrorClass);
    errorElem.classList.remove(errorClass);
    errorElem.textContent = '';
  }

  function checkInputValidity(formElem, inputElem) {
    if (!inputElem.validity.valid) {
      showInputError(formElem, inputElem, inputElem.validationMessage);
    } else {
      hideInputError(formElem, inputElem);
    }
  }

  function hasInvalidInput(inputList) {
    return inputList.some(inputElem => !inputElem.validity.valid)
  }
  
  function toggleButtonState(inputList, buttonElem) {
    if (hasInvalidInput(inputList)) {
      buttonElem.classList.add(inactiveButtonClass);
    } else {
      buttonElem.classList.remove(inactiveButtonClass);
    }
  }
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});
