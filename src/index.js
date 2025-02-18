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

// закрытие попапа
const imagePopup = document.querySelector('.popup_type_image');
addListener(imagePopup);

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: вывести карточки на страницу
initialCards.forEach((cardList) => {
  const cardToPage = createCard(cardList, deleteCard, likeCard, openImageModal);
  placesList.append(cardToPage);
});

//обработчик события submit редактирования профиля
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  
  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;
  
  const popup = formElement.closest('.popup');
  popup.classList.remove('popup_is-opened');
}

formElement.addEventListener('submit', handleFormSubmit);

// обработчик события submit добавления карточки
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = newCardForm.querySelector('.popup__input_type_url');

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };

  const cardElement = createCard(cardData, deleteCard, likeCard, openImageModal);
  placesList.prepend(cardElement);

  newCardForm.reset();
  closeModal(newCardForm.closest('.popup'));
});