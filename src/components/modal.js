// функция коллбек для обработчика клика по Esc
const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener("keydown", handleEscKeyUp);
}

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", handleEscKeyUp);
}

export const addListener = (popup) => {
  const closePopup = popup.querySelector(".popup__close");
  closePopup.addEventListener("click", () => {
    closeModal(popup);
  });

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains(".popup")) {
      closeModal(popup);
    }
  });
};