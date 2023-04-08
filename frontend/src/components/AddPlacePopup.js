import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({onAddPlace, isOpen, onClose}) {
  const [name, setName] = useState('');
  const [link, setlink] = useState('');
  function onChangeName(evt) {
    setName(evt.target.value);
  }
  function onChangeLink(evt) {
    setlink(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: name,
      link: link
    });
  }
  return (
    <PopupWithForm title="Новое место" name="add" isOpen={isOpen} 
    onClose={onClose} buttonText='Создать' onSubmit={handleSubmit}>
      <input onChange={onChangeName} value={name} type="text" id="name-input" className="popup__field" placeholder="Название" required minLength="2" maxLength="30" name="name" />
      <span className="popup__error name-input-error"></span>
      <input onChange={onChangeLink} value={link} type="url" id="link-input" className="popup__field" placeholder="Ссылка на картинку" required name="link" />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}