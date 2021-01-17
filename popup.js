let editButton = document.querySelector('.profile__edit-btn');
let popupProfileWindow = document.querySelector('.popup');
let popupSubmitBtn = document.querySelector('.form__submit-btn');
let popupCloseBtn = document.querySelector('.popup__toggle-btn');

let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.form__input_el_heading');
let profileDescInput = document.querySelector('.form__input_el_subheading');



function editProfile() {
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  popupProfileWindow.classList.add('popup_opened');
}

function closeForm() {
  popupProfileWindow.classList.remove('popup_opened');
  profileNameInput.value = '';
  profileDescInput.value = '';
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  popupProfileWindow.classList.remove('popup_opened');
}


editButton.addEventListener('click', editProfile);
popupCloseBtn.addEventListener('click', closeForm);
popupProfileWindow.addEventListener('submit', handleFormSubmit);

