import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, addClosePopupListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

// Конфигурация для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включение валидации
enableValidation(validationConfig);

// Окно редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик открытия модального окна редактирования профиля
profileEditBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig); // Очистка ошибок
  openModal(popupEditProfile);
});

// Обработчик отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfile);
});

const popup = editProfileForm.closest(".popup");
popup.classList.remove("popup_is-opened");  //?

// окно добавления карточки
const addCardBtn = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");

// Обработчик открытия модального окна добавления карточки
addCardBtn.addEventListener("click", () => openModal(popupAddCard));

// обработчик события submit добавления карточки
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = newCardForm.querySelector(".popup__input_type_url");
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  const cardElement = createCard(cardData, deleteCard, likeCard, handleImageClick);
  placesList.prepend(cardElement);
  newCardForm.reset();
  closeModal(newCardForm.closest(".popup"));
});

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");

addClosePopupListeners(popupEditProfile);
addClosePopupListeners(popupAddCard);
addClosePopupListeners(popupImage);

// функция открытия попапа с картинкой
function handleImageClick(cardData) {
  const imageElement = popupImage.querySelector(".popup__image");
  const captionElement = popupImage.querySelector(".popup__caption");
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  captionElement.textContent = cardData.name;
  openModal(popupImage);
}

// @todo: вывести карточки на страницу
initialCards.forEach((cardList) => {
  const cardToPage = createCard(cardList, deleteCard, likeCard, handleImageClick);
  placesList.append(cardToPage);
});
