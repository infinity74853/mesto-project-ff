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
  
  // • функция открытия imageModal
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

// функция открытия imageModal
export function openImageModal (cardData) {
  const cardElement = document.querySelector('.card__image');
  const popupTypeImage = document.querySelector('.popup_type-image');
  cardElement.src = cardData.link;
  cardElement.alt = cardData.name;
  popupTypeImage.textContent = cardData.name;
  
};

