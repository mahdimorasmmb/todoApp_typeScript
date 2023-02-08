import React from "react";
import HeaderLink from "./HeaderLink";

const Header = () => {
  return (
    <header className="flex bg-header-color px-3 py-5 mb-5 text-white">
      <h1 className="font-bold text-lg">Todo App</h1>
      <nav>
        <HeaderLink href="./">Home</HeaderLink>
        <HeaderLink href="./">Statas</HeaderLink>
        <HeaderLink href="./">About</HeaderLink>
      </nav>
    </header>
  );
};

export default Header;
