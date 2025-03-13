// базовые настройки
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: '477347bb-d8bc-4dbf-8478-d3e39b227db4',
    'Content-Type': 'application/json',
  },
};

// универсальная функция запроса
const request = (endpoint, options = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  return fetch(url, {
    ...options,
    headers: config.headers,
  }).then(checkResponse);
};

// проверка ответа сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

// загрузка информации о пользователе
export const getUserInfo = () => {
  return request('/users/me');
};

// загрузка карточек
export const getInitialCards = () => {
  return request('/cards');
};

// редактирование профиля
export const editProfile = (name, about) => {
  return request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({ name, about }),
  });
};

// добавление новой карточки
export const addNewCard = (name, link) => {
  return request('/cards', {
    method: 'POST',
    body: JSON.stringify({ name, link }),
  });
};

// постановка лайка
export const putLikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
  });
};

// снятие лайка
export const putUnlikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
  });
};

// удаление карточки
export const deleteCardFromServer = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
  });
};

// запрос на обновление аватара
export const updateAvatar = (avatarUrl) => {
  return request('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatar: avatarUrl }),
  });
};