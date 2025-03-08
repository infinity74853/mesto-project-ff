import { apiLikeCard, apiUnlikeCard } from './api.js';

// Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, handleImageClick, currentUserId) {
  // Клонирование шаблона
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  // Установление значения вложенных элементов
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // Добавление к иконке удаления обработчика клика
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCard);

  // Добавление к иконке лайка обработчика клика
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  // Отображение количества лайков
  likeCount.textContent = cardData.likes.length;

  // Проверка, лайкнул ли текущий пользователь карточку
  if (cardData.likes.some((like) => like._id === currentUserId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Обработчик лайка
  cardLikeButton.addEventListener('click', () => {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
      unlikeCard(cardData._id, cardLikeButton, likeCount); // Снимаем лайк
    } else {
      likeCard(cardData._id, cardLikeButton, likeCount); // Ставим лайк
    }
  });

  // Добавление обработчика клика на картинку
  cardImage.addEventListener('click', () => handleImageClick(cardData));

  return cardElement;
}

// @todo: темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: функция удаления карточки
export function deleteCard(evt) {
  const cardEvent = evt.target.closest('.places__item');
  if (cardEvent) {
    cardEvent.remove();
  }
}

// Функция для постановки лайка
export const likeCard = (cardId, likeButton, likeCount) => {
  apiLikeCard(cardId)
    .then((updatedCard) => {
      likeButton.classList.add('card__like-button_is-active'); // Добавляем активное состояние кнопки
      likeCount.textContent = updatedCard.likes.length; // Обновляем количество лайков
    })
    .catch((err) => {
      console.error('Ошибка при постановке лайка:', err);
    });
};

// Функция для снятия лайка
export const unlikeCard = (cardId, likeButton, likeCount) => {
  apiUnlikeCard(cardId)
    .then((updatedCard) => {
      likeButton.classList.remove('card__like-button_is-active'); // Убираем активное состояние кнопки
      likeCount.textContent = updatedCard.likes.length; // Обновляем количество лайков
    })
    .catch((err) => {
      console.error('Ошибка при снятии лайка:', err);
    });
};