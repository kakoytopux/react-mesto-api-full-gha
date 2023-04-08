import React from "react";

export default function PopupWithForm(props) {
  const {name, isOpen, onClose, onSubmit, children, title, buttonSelector, buttonText} = props;
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="close" title="Закрыть" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={`${name}`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`popup__submit ${buttonSelector ? buttonSelector : ''}`}>{buttonText}</button>
        </form>
      </div>
    </div>
  );
}