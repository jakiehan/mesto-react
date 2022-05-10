import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Main = (props) => {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
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
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button transparency-button"
              type="button"
              aria-label="Edit button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__rank">{currentUser.about}</p>
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
          {props.isCards.map((card) =>
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;