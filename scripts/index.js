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
    name: 'Херсонес',
    link: 'https://live.staticflickr.com/65535/50913704173_3d77ca98db_o.jpg'
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


//функционал создания и рендеринга карточки
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
    openPopup();
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
const openPopup = () => popup.classList.add('popup_opened');

const closePopup = () => {
  popup.classList.remove('popup_opened');
  //проверяем, какая форма активна
  forms.forEach(form => {
    if (form.classList.contains('form_active')) {
      form.classList.remove('form_active');
    }
  });
  //и активно ли окно просмотра
  if (popupPhotoContainer.classList.contains('popup__photo-container_active')) {
    popupPhotoContainer.classList.remove('popup__photo-container_active');
    popup.classList.remove('popup_full-view');
  }
  //проверка класса на плавное закрытие
  if (popup.classList.contains('fade')) popup.classList.remove('fade');
};

const closePopupSmoothly = () => {
  popup.classList.add('fade');
  setTimeout(closePopup, 400);
};

const openProfileForm = () => {
  profileForm.classList.add('form_active');
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  openPopup();
};

const submitProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closePopupSmoothly();
};

const openCardForm = () => {
  cardForm.classList.add('form_active');
  openPopup();
};

const submitCardForm = (evt) => {
  evt.preventDefault();
  renderCard(createCard(cardNameInput.value, cardLinkInput.value));
  closePopupSmoothly();
  cardNameInput.value = '';
  cardLinkInput.value = '';
};

profileEditButton.addEventListener('click', openProfileForm);
profileAddButton.addEventListener('click', openCardForm);
popupCloseBtn.addEventListener('click', closePopupSmoothly);
profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);


//отрисовка карточек "из коробки"
const renderInitialCards = () => 
   INITIAL_CARDS.forEach(card => renderCard(createCard(card.name, card.link)));

renderInitialCards();
