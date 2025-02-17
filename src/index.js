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

/////////////////////////////////////////////////////////////////////////////
//обработчик события submit профиля
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

///////////////////////////////////////////////////////////////////////////// 
// обработчик события submit новойкарты








// const newCardForm = document.querySelector('.popup__form');
// // Поля формы карточки
// const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
// const cardUrlInput = newCardForm.querySelector('.popup__input_type_url');
// // Контейнер для карточек
// const cardsContainer = document.querySelector('.places__list');

// // Обработчик отправки формы карточки
// function eNewCardSubmit(evt) {
//     evt.preventDefault();

//     // Собираем данные из полей
//     const cardData = {
//         name: cardNameInput.value, 
//         link: cardUrlInput.value
//     };

//         const cardElement = createCard(
//         cardData, 
//         deleteCard,      // функция удаления карточки
//         likeCard,       // функция лайка
//         openImageModal   // функция открытия изображения
//     );

//     // Добавляем карточку в DOM
//     cardsContainer.prepend(cardElement);

//     // Очищаем форму и закрываем попап
//     newCardForm.reset();
//     closeModal(newCardForm.closest('.popup'));
// }

// // Вешаем обработчик только на форму добавления карточки
// newCardForm.addEventListener('submit', /*eNewCardSubmit*/);
















// const formCardElement = document.querySelector('.popup__form');
// const cardNameInput = formElement.querySelector('.popup__input_type_card-name');
// const cardUrlInput = formElement.querySelector('.popup__input_type_url');

// // Контейнер для карточек (должен существовать в HTML)
// const cardsContainer = document.querySelector('.places__list');

// function handleCardSubmit(evt) {
//   evt.preventDefault();

//   // Собираем данные из формы
//   const cardUrlValue = cardUrlInput.value;
//   const cardNameValue = cardNameInput.value;
  
//   const cardImage = document.querySelector('.card__image');
//   const cardTitle = document.querySelector('.card__title');
  
//   cardImage.textContent = cardUrlValue;
//   cardTitle.textContent = cardNameValue;

//   // Создаём новую карточку (предполагается, что функция createCard уже реализована)
//   const newCard = createCard(
//       cardData, 
//       deleteCard,    // функция удаления карточки
//       likeCard,     // функция лайка
//       openImageModal // функция открытия изображения
//   );

//   // Добавляем карточку в начало списка
//   cardsContainer.prepend(newCard);

//   // Очищаем форму и закрываем попап
//   formElement.reset();
//   closeModal(formElement.closest('.popup'));
// }



// ///////////////////
