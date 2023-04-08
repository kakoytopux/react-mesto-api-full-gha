import React, {useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const {onEditAvatar, cards, onCardClick, onCardLike, onCardDelete, onEditProfile, onAddPlace} = props;
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватарка" className="profile__avatar" />
          <div className="profile__avatar-edit-btn-container">
            <button className="profile__avatar-edit-btn" type="button" title="Редактировать аватар"></button>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button className="profile__edit button-hover" type="button" title="Редактировать профиль" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-content button-hover" type="button" title="Добавить" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map(item => (
          <Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}