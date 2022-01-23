import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

const Header = (props) => {
  console.log(props.user);

  return (
    <header className="header">
      <Link to={"/"}>
        <p className="header__brand">4Forces</p>
      </Link>

      {!props.user && <p className="header__message">Login</p>}

      {props.user && (
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
          <Link to={"/profile"}>
            <div className="header__float">
              <img
                src={props.user.photos[0].value}
                alt="profile pic"
                className="header__avatar"
              />
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
