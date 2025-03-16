import { putLikeCard, putUnlikeCard, deleteCardFromServer } from './api.js';

// функция создания карточки
export function createCard(cardData, confirmDeleteCard, likeCard, handleImageClick, currentUserId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  
  // установление значения вложенных элементов
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // добавление к иконке удаления обработчика клика (если карточка создана текущим пользователем)
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  if (cardData.owner && cardData.owner._id === currentUserId) {
    cardDeleteButton.style.display = 'block'; // показываем иконку удаления
    cardDeleteButton.addEventListener('click', () => confirmDeleteCard(cardData._id, cardElement));
  } else {
    cardDeleteButton.style.display = 'none'; // скрываем иконку удаления
  }

  // добавление к иконке лайка обработчика клика
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  // отображение количества лайков
  likeCount.textContent = cardData.likes.length;

  // проверка, лайкнул ли текущий пользователь карточку
  if (cardData.likes.some((like) => like._id === currentUserId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // обработчик лайка
  cardLikeButton.addEventListener('click', () => {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
      unlikeCard(cardData._id, cardLikeButton, likeCount); // Снимаем лайк
    } else {
      likeCard(cardData._id, cardLikeButton, likeCount); // Ставим лайк
    }
  });

  // добавление обработчика клика на картинку
  cardImage.addEventListener('click', () => handleImageClick(cardData));

  return cardElement;
}

// @todo: темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// функция для постановки лайка
export const likeCard = (cardId, likeButton, likeCount) => {
  putLikeCard(cardId)
    .then((updatedCard) => {
      likeButton.classList.add('card__like-button_is-active'); // добавляем активное состояние кнопки
      likeCount.textContent = updatedCard.likes.length; // обновляем количество лайков
    })
    .catch((err) => {
      console.error('Ошибка при постановке лайка:', err);
    });
};

// функция для снятия лайка
export const unlikeCard = (cardId, likeButton, likeCount) => {
  putUnlikeCard(cardId)
    .then((updatedCard) => {
      likeButton.classList.remove('card__like-button_is-active');
      likeCount.textContent = updatedCard.likes.length; // обновляем количество лайков
    })
    .catch((err) => {
      console.error('Ошибка при снятии лайка:', err);
    });
};