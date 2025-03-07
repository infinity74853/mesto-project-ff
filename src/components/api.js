// запрос к серверу 
export const getUserInfo = () => { 
  return fetch('https://nomoreparties.co/v1/wff-cohort-33/users/me', {
    headers: {
      authorization: '477347bb-d8bc-4dbf-8478-d3e39b227db4',
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
}
