// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {

  // • клонирование шаблона
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  // • установление значения вложенных элементов
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.setAttribute('alt', textContent = cardData.name);
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // • добавление к иконке удаления обработчика клика
  const сardDeleteButton = cardElement.querySelector('.card__delete-button');
  сardDeleteButton.addEventListener('click', deleteCard);
   
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard (event) {
  const cardEvent = event.target.parentElement;
  cardEvent.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardList) => {
  const cardToPage = createCard(cardList, deleteCard);
  placesList.append(cardToPage);
});