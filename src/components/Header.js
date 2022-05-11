import React from 'react';
import logoHeader from "../images/logo-header.svg";

const Header = () => (
    <header className="header">
      <img className="header__logo" src={logoHeader} alt="Логотип" />
    </header>
  );

export default Header;