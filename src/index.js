import './pages/index.css';
import { createCard, likeCard, unlikeCard, handleDeleteCard } from './components/card.js';
import { openModal, closeModal, addClosePopupListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, editProfile, addNewCard, updateAvatar } from './components/api.js';

// конфигурация для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// включение валидации
enableValidation(validationConfig);

const avatarEditButton = document.querySelector('.profile__image-edit');
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = popupAvatar.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');

// обработчик открытия попапа обновления аватара
avatarEditButton.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(popupAvatar);
});

// обработчик отправки формы обновления аватара
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  updateAvatar(avatarInput.value)
    .then((userData) => {
      console.log('Аватар успешно обновлён:', userData);
      const avatarElement = document.querySelector('.profile__image');
      avatarElement.src = userData.avatar;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
});

// окно редактирования профиля
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
  clearValidation(editProfileForm, validationConfig);
  openModal(popupEditProfile);
});

// обработчик отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = editProfileForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  editProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      console.log('Профиль успешно обновлён:', userData);
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
});

// окно добавления карточки
const addCardBtn = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupAddCard.querySelector('.popup__form');

// обработчик открытия модального окна добавления карточки
addCardBtn.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig); // Очистка ошибок
  openModal(popupAddCard);
});

// обработчик отправки формы добавления карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = newCardForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const cardName = newCardForm.querySelector('.popup__input_type_card-name').value;
  const cardLink = newCardForm.querySelector('.popup__input_type_url').value;

  addNewCard(cardName, cardLink)
    .then((cardData) => {
      const cardElement = createCard(cardData, handleDeleteCard, likeCard, handleImageClick, currentUserId);
      placesList.prepend(cardElement);
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
});

// инициализация currentUserId
let currentUserId = null;

// загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    currentUserId = userData._id;
    // обновляем данные профиля
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    const avatarElement = document.querySelector('.profile__image');
    avatarElement.src = userData.avatar;
    // отображаем карточки
    cardsData.forEach((card) => {
      const cardElement = createCard(
        card,
        (cardId, cardElement) => handleDeleteCard(cardId, cardElement),
        likeCard,
        handleImageClick,
        currentUserId
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });

// функция открытия попапа с картинкой
function handleImageClick(cardData) {
  const imageElement = popupImage.querySelector('.popup__image');
  const captionElement = popupImage.querySelector('.popup__caption');
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  captionElement.textContent = cardData.name;
  openModal(popupImage);
}

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const popup = editProfileForm.closest('.popup');
popup.classList.remove('popup_is-opened');

addClosePopupListeners(popupEditProfile);
addClosePopupListeners(popupAddCard);
addClosePopupListeners(popupImage);
addClosePopupListeners(popupAvatar);