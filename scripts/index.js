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

//формы
const form = document.querySelectorAll('.form');
const profileForm = document.querySelector('form[name="profileForm"]');
const profileNameInput = document.querySelector('.form__input_el_heading');
const profileDescInput = document.querySelector('.form__input_el_subheading');
const cardForm = document.querySelector('form[name="addCardForm"]');
const cardNameInput = document.querySelector('.form__input_el_image-caption');
const cardLinkInput = document.querySelector('.form__input_el_image-link');

//развернутое фото
const photo = document.querySelector('.photo');
const photoPic = photo.querySelector('.photo__pic');
const photoCaption = photo.querySelector('.photo__caption');

const openPopup = () => popup.classList.add('popup_opened');

const closePopup = () => {
  popup.classList.remove('popup_opened');
  form.forEach(item => {
    if (item.classList.contains('form_active')) item.classList.remove('form_active')
  });

  if (popupContainer.classList.contains('popup__container_size_big')) {
    popupContainer.classList.remove('popup__container_size_big');
    photo.classList.remove('photo_active');
  }
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
  closePopup();
};

const openCardForm = () => {
  cardForm.classList.add('form_active');
  openPopup();
};

const submitCardForm = (evt) => {
  evt.preventDefault();
  cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value));
  closePopup();
  cardNameInput.value = '';
  cardLinkInput.value = '';
};

const createCard = (name, link) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__heading').textContent = name;

  const cardPreview = cardElement.querySelector('.card__preview');
  cardPreview.style.backgroundImage = `url(${link})`;
  cardPreview.addEventListener('click', function() {
    photoPic.src = link;
    photoCaption.textContent = name;
    photo.classList.add('photo_active');
    popupContainer.classList.add('popup__container_size_big');
    openPopup();
  });

  const likeButton = cardElement.querySelector('.button_like_empty');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_like_liked');
  });

  const deleteButton = cardElement.querySelector('.button_delete');
  deleteButton.addEventListener('click', function() {
    const cardItem = deleteButton.closest('.card');
    cardItem.remove();
  });

  return cardElement;
};

const renderCards = () => 
  INITIAL_CARDS.map(card => cardsList.prepend(createCard(card.name, card.link)));

profileEditButton.addEventListener('click', openProfileForm);
profileAddButton.addEventListener('click', openCardForm);
popupCloseBtn.addEventListener('click', closePopup);
profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

renderCards()