import './pages/index.css';
import { initialCards} from './scripts/cards.js';
import { createCard, deleteCard, likeCard, openImageModal } from './components/card.js';
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

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach((cardList) => {
  const cardToPage = createCard(cardList, deleteCard, likeCard, openImageModal);
  placesList.append(cardToPage);
});

// обработчик события submit
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); 
  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;
  // закрываем попап
  const popup = formElement.closest('.popup');
  popup.classList.remove('popup_is-opened');
}

formElement.addEventListener('submit', handleFormSubmit);

///////////////////////////////////////////////////////////////////////////// 
//const newCardElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
//const cardNameInput = document.querySelector('.popup__input_type_card-name');
//const cardUrlInput = document.querySelector('.popup__input_type_url');

//function newPlaceSubmit(evt) {
    //evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value
    // const cardNameValue = cardNameInput.value;
    // const cardUrlValue = cardUrlInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // const cardName = document.querySelector('.card__title');
    // const cardUrl = document.querySelector('.card__description');
    // Вставьте новые значения с помощью textContent
    // cardName.textContent = cardNameValue;
    // cardUrl.textContent = cardUrlValue;
    // закрываем попап
    // const popup = formElement.closest('.popup');
    // popup.classList.remove('popup_is-opened');
//}

//formElement.addEventListener('submit', handleFormSubmit);

