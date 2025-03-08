import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, addClosePopupListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, editProfile, addNewCard,
  deleteCard as apiDeleteCard, 
  likeCard as apiLikeCard, 
  unLikeCard as apiUnLikeCard } from './components/api.js';

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

// обработчик открытия модального окна редактирования профиля
profileEditBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig); // Очистка ошибок
  openModal(popupEditProfile);
});

// обработчик отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  editProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    });
});

// окно добавления карточки
const addCardBtn = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");

// Обработчик открытия модального окна добавления карточки
addCardBtn.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig); // Очистка ошибок
  openModal(popupAddCard);
});

// обработчик события submit добавления карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardName = newCardForm.querySelector('.popup__input_type_card-name').value;
  const cardLink = newCardForm.querySelector('.popup__input_type_url').value;

  addNewCard(cardName, cardLink)
    .then((cardData) => {
      const cardElement = createCard(cardData, deleteCard, likeCard, handleImageClick);
      placesList.prepend(cardElement);
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    });
});

// загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

    cardsData.forEach((card) => {
      const cardElement = createCard(card, deleteCard, likeCard, handleImageClick);
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });

// функция открытия попапа с картинкой
function handleImageClick(cardData) {
  const imageElement = popupImage.querySelector(".popup__image");
  const captionElement = popupImage.querySelector(".popup__caption");
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  captionElement.textContent = cardData.name;
  openModal(popupImage);
}

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const popup = editProfileForm.closest(".popup");
popup.classList.remove("popup_is-opened");  //?

addClosePopupListeners(popupEditProfile);
addClosePopupListeners(popupAddCard);
addClosePopupListeners(popupImage);

// @todo: вывести карточки на страницу
// initialCards.forEach((cardList) => {
//   const cardToPage = createCard(cardList, deleteCard, likeCard, handleImageClick);
//   placesList.append(cardToPage);
// });
// const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
// const cardUrlInput = newCardForm.querySelector(".popup__input_type_url");
