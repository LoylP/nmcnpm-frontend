"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  path: string;
  icon: JSX.Element;
  title: string;
}

const MenuLink = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`flex items-center p-3 gap-2 my-2 rounded-lg  ${
        pathname === item.path ? "bg-gray-600 text-white" : "hover:bg-gray-700"
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
