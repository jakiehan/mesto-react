import React from 'react';
import api from '../utils/Api.js'
import Card from './Card.js'

const Main = (props) => {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        setCards(cardsData);
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    })

    api.getUserInfo().then((userData) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
    }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    })
  },[])

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={userAvatar}
          alt="Фото профиля"
        />
        <button
          className="profile__avatar-edit"
          type="button"
          aria-label="Edit button"
          onClick={props.onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-button transparency-button"
              type="button"
              aria-label="Edit button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__rank">{userDescription}</p>
        </div>
        <button
          className="profile__add-button transparency-button"
          type="button"
          aria-label="Add button"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="gallery">
        <ul className="gallery__elements">
          {cards.map((card) =>
            <Card card={card} key={card._id} onCardClick={props.onCardClick} />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;