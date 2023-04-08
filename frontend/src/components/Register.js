import React, { useState } from "react";
import Header from "./Header";
import SignMain from './SignMain';
import InfoTooltip from "./InfoTooltip";
import signApi from "../utils/signApi";

export default function Register() {
  const [signUpStatus, setSignUpStatus] = useState(null);
  const [statusOpened, setStatusOpened] = useState(false);
  function setData(data) {
    signApi.signUp({
      pass: data.fieldPass.current.value,
      email: data.fieldEmail.current.value
    })
    .then(() => {
      setSignUpStatus(true);
    })
    .catch(() => {
      setSignUpStatus(false);
    })
    .finally(() => {
      setStatusOpened(true);
    })
  }
  return (
    <>
      <Header signLink='/sign-in' signText='Войти' />
      <SignMain title='Регистрация' submitText='Зарегистрироваться' setData={setData} signUp={true} />
      <InfoTooltip signUpStatus={signUpStatus} statusOpened={statusOpened} setStatusOpened={setStatusOpened} />
    </>
  );
}