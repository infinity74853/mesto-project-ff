  информация пользователя
export function apiUserInfo ({profileName, profileDescription, profileImage}) {
  const renderProfileinfo = (data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileImage.src = data.avatar;
  }
  
  return fetch('https://nomoreparties.co/v1/wff-cohort-33/cards', {
    headers: {
      authorization: '477347bb-d8bc-4dbf-8478-d3e39b227db4'
    }
  })
    .then(res => res.json())
    .then(data => {
      
    })
}
