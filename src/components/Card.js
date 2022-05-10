import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = (props) => {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(like => like._id === currentUser._id);
  const likesCount = (props.card.likes.length > 0 && props.card.likes.length);

  const handleDeleteClick = () => props.onCardDelete(props.card);
  const handleLikeClick = () => props.onCardLike(props.card);
  const handleClick = () => props.onCardClick(props.card);

  return (
    <li className="gallery__element">
      <article className="photo-card">
        <img
          className="photo-card__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        /> {isOwn &&
          <button
            className="photo-card__trash transparency-button"
            type="button"
            aria-label="Trash button"
            onClick={handleDeleteClick}
          />
          }
          <div className="photo-card__info">
            <h2 className="photo-card__image-title">{props.card.name}</h2>
            <div className="photo-card__image-like-wrapper">
              <button
                className={`photo-card__image-like ${isLiked && 'photo-card__image-like_active'} transparency-button transparency-button_opacity_less`}
                type="button"
                aria-label="Like button"
                onClick={handleLikeClick}
              />
              <span className="photo-card__image-like-count">{likesCount}</span>
            </div>
          </div>
      </article>
    </li>
  )
}

export default Card;