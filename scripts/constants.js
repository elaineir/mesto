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

const VALIDATION_SETTINGS = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

export { INITIAL_CARDS, VALIDATION_SETTINGS };