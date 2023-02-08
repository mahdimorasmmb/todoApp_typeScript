import React, { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

const HeaderLink = ({ href, children }: Props) => {
  return (
    <a className="text-white  no-underline  cursor-pointer" href={href}>
     {children}
    </a>
  );
};

export default HeaderLink;
