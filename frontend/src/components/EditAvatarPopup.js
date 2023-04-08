import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({onUpdateAvatar, onClose, isOpen}) {
  const fieldAvatarRef = useRef();
  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: fieldAvatarRef.current.value
    });
  }
  return (
    <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isOpen}
    onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
      <input ref={fieldAvatarRef} type="url" id="avatar-input" className="popup__field" placeholder="Ссылка на картинку" required name="edit" />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );
}