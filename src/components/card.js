import { openModal } from './modal.js';

// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openImageModal) {
  // • клонирование шаблона
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  // • установление значения вложенных элементов
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  // • добавление к иконке удаления обработчика клика
  const сardDeleteButton = cardElement.querySelector('.card__delete-button');
  сardDeleteButton.addEventListener('click', deleteCard);
  
  // • добавление к иконке лайка обработчика клика
  const сardLikeButton = cardElement.querySelector('.card__like-button');
  сardLikeButton.addEventListener('click', likeCard);
  
  // • окно попапа изображенияl
  const cardImageBtn = cardElement.querySelector('.card__image');
  cardImageBtn.addEventListener('click', () => openImageModal(cardData));
    
  return cardElement;
}

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция удаления карточки
export function deleteCard (evt) {
  const cardEvent = evt.target.parentElement;
  cardEvent.remove();
};

// функция лайка карточки
export function likeCard (evt) {
  const cardEvent = evt.target.classList;
  cardEvent.toggle('card__like-button_is-active');
};

// Функция открытия модалки с изображением
export const openImageModal = (cardData) => {
  
  const imagePopup = document.querySelector('.popup_type_image');
  const imageElement = imagePopup.querySelector('.popup__image');
  const captionElement = imagePopup.querySelector('.popup__caption');
  

  // Заполняем данные
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  captionElement.textContent = cardData.name;

  // Открываем попап
  openModal(imagePopup);
};
