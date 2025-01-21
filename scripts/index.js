// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, cardDelete) {

  // • Клонирование шаблона
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  // • Установление значения вложенных элементов
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.setAttribute('alt', textContent = cardData.name);
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // • Добавление к иконке удаления обработчика клика
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', cardDelete);
   
  return cardElement;
}

// @todo: Функция удаления карточки
function cardDelete (evt) {
  const evtn = evt.target.parentElement;
  evtn.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardDat) => {
  const card = createCard(cardDat, cardDelete);
  placesList.append(card);
});