'use strict';

const INITIAL_CARDS = [
  {
    name: 'Выборг',
    link: 'https://live.staticflickr.com/65535/50908099792_57d59fff37_o.jpg'
  },
  {
    name: 'Ольхон, Байкал',
    link: 'https://live.staticflickr.com/65535/50907269318_74ff811fac_o.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://live.staticflickr.com/65535/50908099337_bc66ec9eb9_o.jpg'
  },
  {
    name: 'Карелия',
    link: 'https://live.staticflickr.com/65535/50908099827_3c3557c0a8_o.jpg'
  },
  {
    name: 'Херсонес',
    link: 'https://live.staticflickr.com/65535/50908099447_74f4885dbd_o.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://live.staticflickr.com/65535/50907270048_87735fa432_o.jpg'
  }
];

//профиль
const profileEditButton = document.querySelector('.button_edit');
const profileAddButton = document.querySelector('.button_add');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

//карточки
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.template-card').content;

//попап
const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupCloseBtn = popup.querySelector('.button_close');
const popupPhotoContainer = popup.querySelector('.popup__photo-container');

//формы
const forms = document.querySelectorAll('.form');
const profileForm = document.querySelector('form[name="profileForm"]');
const profileNameInput = document.querySelector('.form__input_el_heading');
const profileDescInput = document.querySelector('.form__input_el_subheading');
const cardForm = document.querySelector('form[name="addCardForm"]');
const cardNameInput = document.querySelector('.form__input_el_image-caption');
const cardLinkInput = document.querySelector('.form__input_el_image-link');

//окно просмотра фото
const photoPic = popupPhotoContainer.querySelector('.photo__pic');
const photoCaption = popupPhotoContainer.querySelector('.photo__caption');

const openPopup = () => popup.classList.add('popup_opened');

//добавим плавности :3
const openPopupSmoothly = () => {
  popup.classList.add('appear');
  setTimeout(openPopup, 200);
};

const closePopup = () => {
  popup.classList.remove('popup_opened');
  //проверяем, какая форма активна и активно ли окно просмотра
  forms.forEach(form => {
    if (form.classList.contains('form_active')) {
      form.classList.remove('form_active');
    }
  });
  
  if (popupPhotoContainer.classList.contains('popup__photo-container_active')) {
    popupPhotoContainer.classList.remove('popup__photo-container_active');
    popup.classList.remove('popup_full-view');
  }

  popup.classList.remove('fade');
};

const closePopupSmoothly = () => {
  popup.classList.remove('appear');
  popup.classList.add('fade');
  setTimeout(closePopup, 400);
};

const openProfileForm = () => {
  profileForm.classList.add('form_active');
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  openPopupSmoothly();
};

const submitProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closePopupSmoothly();
};

const openCardForm = () => {
  cardForm.classList.add('form_active');
  openPopupSmoothly();
};

const submitCardForm = (evt) => {
  evt.preventDefault();
  cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value));
  closePopupSmoothly();
  cardNameInput.value = '';
  cardLinkInput.value = '';
};

const createCard = (name, link) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

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
    popupPhotoContainer.classList.add('popup__photo-container_active');
    popup.classList.add('popup_full-view');
    openPopupSmoothly();
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

const renderCards = () => 
  INITIAL_CARDS.map(card => cardsList.prepend(createCard(card.name, card.link)));

profileEditButton.addEventListener('click', openProfileForm);
profileAddButton.addEventListener('click', openCardForm);
popupCloseBtn.addEventListener('click', closePopupSmoothly);
profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

renderCards()