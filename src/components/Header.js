import React from 'react';
import logoHeader from "../images/logo-header.svg";

const Header = () => {

  return (
    <header className="header">
      <img className="header__logo" src={logoHeader} alt="Логотип" />
    </header>
  );
}

export default Header;