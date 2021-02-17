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
const photoPic = showCardPopup.querySelector('.photo__pic');
const photoCaption = showCardPopup.querySelector('.photo__caption');

//формы
const profileForm = document.forms.editProfileForm;
const profileNameInput = profileForm.elements.heading;
const profileDescInput = profileForm.elements.subheading;
const cardForm = document.forms.addCardForm;
const cardNameInput = cardForm.elements.imageCaption;
const cardLinkInput = cardForm.elements.imageLink;


//функционал создания и рендеринга карточки
const createCard = (name, link) => {
  const cardElement = cardTemplate.content.cloneNode(true);

  cardElement.querySelector('.card__heading').textContent = name;

  const cardPreview = cardElement.querySelector('.card__preview');
  cardPreview.style.backgroundImage = `url(${link})`;
  cardPreview.addEventListener('click', handleFullView);
  
  function handleFullView(evt) {
    //убираем стандартное событие ссылки
    //чтобы окно просмотра не скроллило страницу наверх
    evt.preventDefault();
    cardPreview.getAttribute('href').replace('');
    //наполняем окно просмотра
    photoPic.src = link;
    photoPic.alt = name;
    photoCaption.textContent = name;
    openPopup(showCardPopup);
  }

  const likeButton = cardElement.querySelector('.button_like_empty');
  likeButton.addEventListener('click', handleLike);
  
  function handleLike(evt) {
    evt.target.classList.toggle('button_like_liked');
  }

  const deleteButton = cardElement.querySelector('.button_delete');
  deleteButton.addEventListener('click', handleDelete);
  
  function handleDelete() {
    const cardItem = deleteButton.closest('.card');
    cardItem.remove();
    cardPreview.removeEventListener('click', handleFullView);
    likeButton.removeEventListener('click', handleLike);
    deleteButton.removeEventListener('click', handleDelete);
  }

  return cardElement;
};

const renderCard = card => cardsList.prepend(card);


//функционал попапов и форм
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
};

const closePopup = popup => {
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
};

popups.forEach(popup => popup.addEventListener('mousedown', closePopupOnOverlay));
popupCloseButtons.forEach(button => button.addEventListener('click', closePopupOnButton));
profileEditButton.addEventListener('click', openProfileForm);
profileAddButton.addEventListener('click', openCardForm);
profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

//отрисовка карточек "из коробки"
INITIAL_CARDS.forEach(card => renderCard(createCard(card.name, card.link)));
