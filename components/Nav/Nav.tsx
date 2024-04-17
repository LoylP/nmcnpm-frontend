"use client";
import { useState } from "react";
import { BiHomeAlt, BiInfoCircle, BiMenu, BiBed } from "react-icons/bi";
import NavItem from "./NavItem";

const defaultIconSize = "2rem";

const items = [
  { label: "Home", icon: <BiHomeAlt size={defaultIconSize} />},
  { label: "Room", icon: <BiBed size={defaultIconSize} />},
  { label: "About", icon: <BiInfoCircle size={defaultIconSize} /> },
];

const NavItemsContainer = () => (
  <>
    {items.map((item, index) => (
      <NavItem item={item} key={index} />
    ))}
  </>
);

const Index = () => {
  const [isNavMenuMobileOpen, setIsNavMenuMobileOpen] = useState(false);

  return (
    <nav className="col-span-1 bg-slate-400">
      <div className="flex mx-4 justify-between items-center md:block">
        <h4 className="uppercase font-bold text-primary py-4 border-b border-primary text-right">
          HNP.com
        </h4>
        <BiMenu
          className="cursor-pointer md:hidden"
          size={defaultIconSize}
          onClick={() => setIsNavMenuMobileOpen(!isNavMenuMobileOpen)}
        />
      </div>
      <ul
        className={`mx-4 my-2 ${
          isNavMenuMobileOpen ? "" : " hidden"
        } md:block `}
      >
        <NavItemsContainer />
      </ul>
    </nav>
  );
};

export default Index;
