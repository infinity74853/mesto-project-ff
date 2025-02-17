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
  
  // • добавление на картинку обработчика клика для imageModal
  const cardImageBtn = cardElement.querySelector('.card__image');
  const popupTypeImage = cardElement.querySelector('.popup_type_image');
  cardImageBtn.addEventListener('click', () => openImageModal(popupTypeImage));
  
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
export const openImageModal = (cardData) => {
  const imageModal = document.querySelector('.popup__image');
  const captionModal = document.querySelector('.popup__caption');
  imageModal.src = cardData.link;
  imageModal.alt = cardData.name;
  captionModal.textContent = imageModal.alt;
}
