'use strict';

const INITIAL_CARDS = [
  {
    name: 'Парк Монрепо, Выборг, Россия',
    link: 'https://live.staticflickr.com/65535/50913703638_b4fcd03bfe_o.jpg'
  },
  {
    name: 'Республика Коми, Россия',
    link: 'https://live.staticflickr.com/65535/50914523672_b12464bd19_o.jpg'
  },
  {
    name: 'Тулиновка, Россия',
    link: 'https://live.staticflickr.com/65535/50914523872_6806f86d99_o.jpg'
  },
  {
    name: 'Камчатка, Россия',
    link: 'https://live.staticflickr.com/65535/50914393181_baa1575e2f_o.jpg'
  },
  {
    name: 'Байкал, Россия',
    link: 'https://live.staticflickr.com/65535/50914524227_75cd43e7e4_o.jpg'
  },
  {
    name: 'Херсонес, Крым, Россия',
    link: 'https://live.staticflickr.com/65535/50913704173_3d77ca98db_o.jpg'
  }
];

//профиль
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.button_edit');
const profileAddButton = document.querySelector('.button_add');

//карточки
const cardsList = document.querySelector('.cards__list');
const cardTemplate = cardsList.querySelector('.template-card');

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
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
};

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
};

const closePopupOnButton = evt => {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
};

const closePopupOnOverlay = evt => {
  if (evt.target === evt.currentTarget) closePopup(evt.target);
};

const closePopupOnEsc = evt => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};


//функционал создания и рендеринга карточки
const createCard = (name, link) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector('.card__heading').textContent = name;
  const cardPreview = cardElement.querySelector('.card__preview');
  cardPreview.style.backgroundImage = `url(${link})`;
  return cardElement;
};

const renderCard = card => cardsList.prepend(card);


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

const submitCardForm = () => {
  renderCard(createCard(cardNameInput.value, cardLinkInput.value));
  closePopup(addCardPopup);
  cardForm.reset();
  cardFormSubmitButton.classList.add('form__submit-btn_disabled');
};


popups.forEach(popup => popup.addEventListener('mousedown', closePopupOnOverlay));
popupCloseButtons.forEach(button => button.addEventListener('click', closePopupOnButton));
profileEditButton.addEventListener('click', openProfileForm);
profileAddButton.addEventListener('click', openCardForm);
profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);


//делегирование функционала карточек с родителя (списка)
cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('button_like_default'))
    evt.target.classList.toggle('button_like_liked');
});

cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('button_delete')) {
    const cardItem = evt.target.closest('.card');
    cardItem.remove();
  }
});

cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__preview')) {
    //убираем стандартное событие ссылки
    //чтобы окно просмотра не скроллило страницу наверх
    evt.preventDefault();
    evt.target.getAttribute('href').replace('');
    //наполнение попапа с фото
    const cardItem = evt.target.closest('.card');
    const cardCaption = cardItem.querySelector('.card__heading');
    photoFull.src = evt.target.style.backgroundImage.slice(5, -2);
    photoFull.alt = cardCaption.textContent;
    photoCaption.textContent = cardCaption.textContent;
    openPopup(showCardPopup);
  }
});


//отрисовка карточек "из коробки"
INITIAL_CARDS.forEach(card => renderCard(createCard(card.name, card.link)));
