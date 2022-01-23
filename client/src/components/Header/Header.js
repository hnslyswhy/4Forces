import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../utilities/AuthContext";
import "./Header.scss";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className="header">
      <Link to={"/"}>
        <p className="header__brand">4Forces</p>
      </Link>

      {!authCtx.user && <p className="header__message">Login</p>}

      {authCtx.user && (
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
                src={authCtx.user.photos[0].value}
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
