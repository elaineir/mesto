let editButton = document.querySelector('.profile__edit-btn');
let popupWindow = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.form__input_el_heading');
let profileDescInput = document.querySelector('.form__input_el_subheading');

function togglePopUp() {
  popupWindow.classList.toggle('popup_opened');
}

function editProfile() {
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  togglePopUp()
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  togglePopUp()
}

editButton.addEventListener('click', editProfile);
popupCloseBtn.addEventListener('click', togglePopUp);
popupWindow.addEventListener('submit', submitProfileForm);
