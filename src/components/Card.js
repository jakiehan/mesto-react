import React from 'react';

const Card = (props) => {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="gallery__element">
      <article className="photo-card">
        <img
          className="photo-card__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
          <button
            className="photo-card__trash transparency-button"
            type="button"
            aria-label="Trash button"
          />
          <div className="photo-card__info">
            <h2 className="photo-card__image-title">{props.card.name}</h2>
            <div className="photo-card__image-like-wrapper">
              <button
                className="photo-card__image-like transparency-button transparency-button_opacity_less"
                type="button"
                aria-label="Like button"
              />
              <span className="photo-card__image-like-count">{props.card.likes.length}</span>
            </div>
          </div>
      </article>
    </li>
  )
}

export default Card;