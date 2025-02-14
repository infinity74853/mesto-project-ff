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