import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to={"/"}>Happy Aviator</Link>

      <div className="header__buttons">
        <NavLink
          to={"/testprep"}
          className="header__button"
          activeClassName="header__active"
        >
          Test Prep
        </NavLink>
        <NavLink
          to={"/resource"}
          className="header__button"
          activeClassName="header__active"
        >
          {" "}
          Resource
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
