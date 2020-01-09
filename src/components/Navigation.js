import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav__container">
      <Link className="nav__item" to="/">HOME</Link>
      <div className="nav__line"/>
      <Link className="nav__item" to="/about">ABOUT</Link>
    </div>
  );
}

export default Navigation;
