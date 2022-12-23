import React from "react";

import logo from "../images/logo.png";

const Header = ({ rightContent }) => {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип" />
      {rightContent}
    </header>
  );
};

export default Header;
