let editButton = document.querySelector('.profile__edit-btn');
let popupProfileWindow = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__toggle-btn');

let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.form__input_el_heading');
let profileDescInput = document.querySelector('.form__input_el_subheading');

function openPopUp() {
  popupProfileWindow.classList.add('popup_opened');
}

function closePopUp() {
  popupProfileWindow.classList.remove('popup_opened');
}

function editProfile() {
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  openPopUp();
}

function cancelForm() {
  closePopUp();
  profileNameInput.value = '';
  profileDescInput.value = '';
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closePopUp();
}

editButton.addEventListener('click', editProfile);
popupCloseBtn.addEventListener('click', cancelForm);
popupProfileWindow.addEventListener('submit', handleFormSubmit);
