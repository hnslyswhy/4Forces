import React from "react";
import mail from "../../assets/icons/mail.svg";
import github from "../../assets/icons/github.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">© Copyright 2021</p>
      <div className="footer__icons-container">
        <a className="footer__link" href="mailto:huanyuw01@gmail.com">
          <img className="footer__icon" src={mail} alt="e-mail me" />
        </a>
        <a
          className="footer__link"
          href="https://github.com/hnslyswhy"
          target="_blank"
          rel="noreferrer"
        >
          <img className="footer__icon" src={github} alt="github" />
        </a>
        <a
          className="footer__link"
          href="https://www.linkedin.com/in/huanyu-wang-015b91190/"
          target="_blank"
          rel="noreferrer"
        >
          <img className="footer__icon" src={linkedin} alt="linkedin" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
