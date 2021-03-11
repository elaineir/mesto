import { fillCardPopup, openPopup, showCardPopup } from './index.js';

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleLike(evt) {
    evt.target.classList.toggle('button_like_liked');
  }

  _handleDelete(evt) {
    evt.target.closest('.card').remove();
  }

  _handleFullView(evt) {
    //убрать стандартное событие ссылки
    //чтобы окно просмотра не скроллило страницу наверх
    evt.preventDefault();
    this._card = evt.target.closest('.card');
    this._card.querySelector('.card__preview').getAttribute('href').replace('');
    //наполнить окно просмотра
    const nameSource = this._name;
    const linkSource = this._link;
    fillCardPopup(nameSource, linkSource);
    openPopup(showCardPopup);
  }

  _setEventListeners() {
    this._card.querySelector('.button_like_default').addEventListener('click', (evt) => {
      this._handleLike(evt);
    });

    this._card.querySelector('.button_delete').addEventListener('click', (evt) => {
      this._handleDelete(evt);
    });

    this._card.querySelector('.card__preview').addEventListener('click', (evt) => {
      this._handleFullView(evt);
    });
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.card__heading').textContent = this._name;
    this._card.querySelector('.card__preview').style.backgroundImage = `url(${this._link})`;

    return this._card;
  }
}

export default Card;
