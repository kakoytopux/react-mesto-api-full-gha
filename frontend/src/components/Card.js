import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const ownCard = currentUser._id === card.owner._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <article className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      {ownCard && <button type="button" className="card__delete button-hover" title="Удалить" onClick={handleDeleteClick}></button>}
      <div className="card__block">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button type="button" className={`card__like ${isLiked && 'card__like_active'}`} title="Нравится" onClick={handleLikeClick}></button>
          <p className="card__like-quantity">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}