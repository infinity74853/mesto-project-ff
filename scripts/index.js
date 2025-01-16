// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки


// @todo: Вывести карточки на страницу


const list = document.querySelector('.card-template');

const listElements = [];
for (let i = 0; i < list.length; i++) {
  const listItem = document.createElement('li');
  listItem.textContent = list[i];
    listElements[i] = listItem;
}

for (let i = 0; i < taskElements.length; i++) {
    list.append(listElements[i])
} 