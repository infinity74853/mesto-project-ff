// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, handleImageClick) {
  // • клонирование шаблона
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  // • установление значения вложенных элементов
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // • добавление к иконке удаления обработчика клика
  const сardDeleteButton = cardElement.querySelector(".card__delete-button");
  сardDeleteButton.addEventListener("click", deleteCard);

  // • добавление к иконке лайка обработчика клика
  const сardLikeButton = cardElement.querySelector(".card__like-button");
  сardLikeButton.addEventListener("click", likeCard);

  // • добавление обработчика клика на картинку
  cardImage.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

// @todo: темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: функция удаления карточки
export function deleteCard(evt) {
  const cardEvent = evt.target.parentElement;

  cardEvent.remove();
}

// функция лайка карточки
export function likeCard(evt) {
  const cardEvent = evt.target.classList;
  cardEvent.toggle("card__like-button_is-active");
}