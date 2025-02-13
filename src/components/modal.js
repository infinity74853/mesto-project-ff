const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  modal.classList.add('.popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
}

export const closeModal = (modal) => {
  modal.classList.remove('.popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
}

export const AddListener = (popup) => {
  const closePopup = popup.querySelector(".popup__close");
  closePopup.addEventListener('click', () => {
    closeModal(popup);
  });

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
};

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

AddListener(popupEditProfile);
AddListener(popupAddCard);
AddListener(popupImage);