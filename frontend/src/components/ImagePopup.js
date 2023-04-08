import React from "react";

export default function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_expansion ${card ? "popup_opened" : ""}`}>
      <div className="popup__expansion-container">
        <button type="button" className="close" title="Закрыть" onClick={onClose}></button>
        <img src={card ? `${card.link}` : "#"} alt={card ? `${card.name}` : ""} className="popup__expansion-img" />
        <h2 className="popup__expansion-title">{card ? `${card.name}` : ""}</h2>
      </div>
    </div>
  );
}