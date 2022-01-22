import React from "react";
import google from "../../assets/icons/google.svg";
import github from "../../assets/icons/github.svg";
import "./LoginPage.scss";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <div className="login">
      <h1 className="login__title">Choose a Login Method</h1>
      <div className="login__container">
        <div className="login__left">
          <div className="login__google" onClick={handleGoogleLogin}>
            <img src={google} alt="google login" className="login__icon" />
            Google
          </div>
          <div className="login__github">
            <img src={github} alt="github login" className="login__icon" />
            Github
          </div>
        </div>
        <div className="login__center">
          <div className="login__line" />
          <div className="login__or">OR</div>
        </div>
        <div className="login__right">
          <input className="login__input" type="text" placeholder="Username" />
          <input className="login__input" type="text" placeholder="Password" />
          <button className="login__button" type="submit">
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
