import './pages/index.css';
import { initialCards} from './scripts/cards.js';
import { deleteCard, cardTemplate, likeCard } from './components/card.js';
import { openModal, closeModal, addListener } from './components/modal.js';

// окно редактирование профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
profileEditBtn.addEventListener("click", () => openModal(popupEditProfile));
addListener(popupEditProfile);

// окно добавление карточки
const addCardBtn = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
addCardBtn.addEventListener("click", () => openModal(popupAddCard));
addListener(popupAddCard);

// окно превью фотографии
const cardImageButton = document.querySelector('.card__image');
const popupTypeImage = document.querySelector('.popup_type_image');
//cardImageButton.addEventListener('click', openImageModal);


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard(cardData, deleteCard, likeCard, openImageModal) {

  // • клонирование шаблона
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  // • установление значения вложенных элементов
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.setAttribute('alt', cardData.name);
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // • добавление к иконке удаления обработчика клика
  const сardDeleteButton = cardElement.querySelector('.card__delete-button');
  сardDeleteButton.addEventListener('click', deleteCard);
  
  // • добавление к иконке лайка обработчика клика
  const сardLikeButton = cardElement.querySelector('.card__like-button');
  сardLikeButton.addEventListener('click', likeCard);
  
  // • добавление обработчика клика на превью
  
  
  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardList) => {
  const cardToPage = createCard(cardList, deleteCard, likeCard);
  placesList.append(cardToPage);
});