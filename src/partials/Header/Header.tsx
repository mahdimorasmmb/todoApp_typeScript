import React from "react";
import HeaderLink from "./HeaderLink";

const Header = () => {
  return (
    <header className="bg-PRIMARY_COLOR mb-5 flex px-3 py-5 text-white">
      <h1 className="text-lg font-bold">Todo App</h1>
      <nav className="m-auto">
        <HeaderLink href="./">Home</HeaderLink>
        <HeaderLink href="./">Statas</HeaderLink>
        <HeaderLink href="./">About</HeaderLink>
      </nav>
    </header>
  );
};

export default Header;
