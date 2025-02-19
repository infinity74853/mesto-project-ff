// функция закрытия по Esc
const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

// функция открытия Popup
export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
};

// функция закрытия Popup
export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
};

// функция закрытия по крестику
export const addClosePopupListeners = (popup) => {
  const closePopup = popup.querySelector(".popup__close");
  closePopup.addEventListener("click", () => {
    closeModal(popup);
  });

  // функция закрытия по Overlay
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
};
