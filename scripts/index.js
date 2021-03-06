'use strict';

import { INITIAL_CARDS, VALIDATION_SETTINGS } from './constants.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

export { handleCardPopup };

//профиль
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.button_edit');
const profileAddButton = document.querySelector('.button_add');

//карточки
const cardsList = document.querySelector('.cards__list');

//попапы
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('#editProfilePopup');
const addCardPopup = document.querySelector('#addCardPopup');
const showCardPopup = document.querySelector('#showCardPopup');
const popupCloseButtons = document.querySelectorAll('.button_close');

//окно просмотра фото
const photoFull = showCardPopup.querySelector('.figure__image');
const photoCaption = showCardPopup.querySelector('.figure__caption');

//формы
const profileForm = document.forms.editProfileForm;
const profileNameInput = profileForm.elements.heading;
const profileDescInput = profileForm.elements.subheading;
const cardForm = document.forms.addCardForm;
const cardNameInput = cardForm.elements.imageCaption;
const cardLinkInput = cardForm.elements.imageLink;
const cardFormSubmitButton = cardForm.querySelector('#cardFormSubmitBtn');

//функционал попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
};

const closePopupOnButton = (evt) => {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
};

const closePopupOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) closePopup(evt.target);
};

const closePopupOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

const handleCardPopup = (name, link) => {
  photoFull.alt = name;
  photoCaption.textContent = name;
  photoFull.src = link;
  openPopup(showCardPopup);
};

//функционал форм
const openProfileForm = () => {
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  openPopup(editProfilePopup);
};

const submitProfileForm = () => {
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closePopup(editProfilePopup);
};

const openCardForm = () => openPopup(addCardPopup);

const createCard = (cardData) => {
  const card = new Card(cardData, '.template-card');
  return card.generateCard();
};

const renderCard = (card) => cardsList.prepend(card);

const submitCardForm = () => {
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }

  renderCard(createCard(cardData));
  closePopup(addCardPopup);

  cardForm.reset();
  cardFormSubmitButton.classList.add('form__submit-btn_disabled');
  cardFormSubmitButton.disabled = true;
};

popups.forEach((popup) => popup.addEventListener('mousedown', closePopupOnOverlay));
popupCloseButtons.forEach((button) => button.addEventListener('click', closePopupOnButton));
profileEditButton.addEventListener('click', openProfileForm);
profileAddButton.addEventListener('click', openCardForm);
profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

//отрисовать карточки "из коробки"
INITIAL_CARDS.forEach((card) => renderCard(createCard(card))); 

//инициализировать валидацию
const profileFormValidator = new FormValidator(VALIDATION_SETTINGS, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(VALIDATION_SETTINGS, cardForm);
cardFormValidator.enableValidation();
