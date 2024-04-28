"use client";
import { useState } from "react";
export interface Item {
  label: string;
  icon: JSX.Element;
  hover?: boolean;
  active?: boolean;
}

const NavItem = ({ item }: { item: Item }) => {
  const { label, icon, active, hover } = item;

  return (
    <li
      className={`flex p-2 justify-end items-center hover:bg-slate-500 cursor-pointer${item}`}
    >
      {icon}
      <h3 className="mr-2">{label}</h3>
    </li>
  );
};

export default NavItem;
