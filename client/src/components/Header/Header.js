import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to={"/"}>
        <p className="header__brand">4Force</p>
      </Link>

      <div className="header__nav">
        <NavLink
          to={"/testprep"}
          className="header__link"
          activeClassName="header__active"
        >
          Test Prep
        </NavLink>
        <NavLink
          to={"/resource"}
          className="header__link"
          activeClassName="header__active"
        >
          Resource
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
