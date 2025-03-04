import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, addClosePopupListeners } from './components/modal.js';
import { apiUserInfo } from './components/api.js';

// Promise.all([apiUserInfo(), apiShowCards()])
//   .then(([userData, cardsData]) => {
//     apiUserInfo(userData);
//     apiShowCards(cardsData);
//   })
// renderProfileinfo(data);

// окно редактирование профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

addClosePopupListeners(popupEditProfile);

//обработчик события submit редактирования профиля
const editProfileForm = popupEditProfile.querySelector('.popup_type_edit .popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  
  const popup = ditProfileForm.closest('.popup');
  popup.classList.remove('popup_is-opened');
}

editProfileForm.addEventListener('submit', handleFormSubmit);

// окно добавление карточки
const addCardBtn = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');

addCardBtn.addEventListener("click", () => openModal(popupAddCard));

addClosePopupListeners(popupAddCard);

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

  const cardElement = createCard(cardData, deleteCard, likeCard, handleImageClick);
  placesList.prepend(cardElement);

  newCardForm.reset();
  closeModal(newCardForm.closest('.popup'));
});

// закрытие попапа
const popupImage = document.querySelector('.popup_type_image');

addClosePopupListeners(popupImage);

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// функция открытия попапа с картинкой
function handleImageClick(cardData) {

  const imageElement = popupImage.querySelector('.popup__image');
  const captionElement = popupImage.querySelector('.popup__caption');

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  captionElement.textContent = cardData.name;

  openModal(popupImage);
}

// @todo: вывести карточки на страницу
apiUserInfo.forEach((cardList) => {
  const cardToPage = createCard(cardList, deleteCard, likeCard, handleImageClick);

  placesList.append(cardToPage);
});

clearValidation(profileForm, validationConfig); 