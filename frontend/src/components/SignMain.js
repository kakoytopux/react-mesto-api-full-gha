import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function SignMain(props) {
  const { title, submitText, signUp, setData } = props;
  const fieldPass = useRef();
  const fieldEmail = useRef();
  function onSubmitForm(evt) {
    evt.preventDefault();

    setData({fieldPass, fieldEmail})
  }
  return (
    <main className="sign-content">
      <h1 className="sign-content__title">{title}</h1>
      <form method="post" className="sign-content__form" onSubmit={onSubmitForm}>
        <input ref={fieldEmail} className="sign-content__field" type='email' placeholder="Email" required name="email" />
        <input ref={fieldPass} className="sign-content__field" type='password' placeholder="Пароль" required name="password" />
        <button type="submit" className="sign-content__submit">{submitText}</button>
      </form>
      {signUp ? <p className="sign-content__sign-in">Уже зарегистрированы? <Link to='/sign-in' className="sign-content__link-sign-in">Войти</Link></p> : ''}
    </main>
  );
}