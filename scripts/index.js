// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function cardCreate(cardData, cardDelete) {

  // • клонирование шаблона
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  // • установление значения вложенных элементов
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.setAttribute('alt', textContent = cardData.name);
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // • добавление к иконке удаления обработчика клика
  const сardDelButton = cardElement.querySelector('.card__delete-button');
  сardDelButton.addEventListener('click', cardDelete);
   
  return cardElement;
}

// @todo: Функция удаления карточки
function cardDelete (evt) {
  const cardEvent = evt.target.parentElement;
  cardEvent.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardList) => {
  const cardToPage = cardCreate(cardList, cardDelete);
  placesList.append(cardToPage);
});