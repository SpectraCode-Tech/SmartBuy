import React, { useState } from "react"; 
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../assets/smartbuy-light.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/shop?search=${search}`);
    }
  };

  // Navigation array with conditional Contact/Add Product
  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Shop", href: "/shop", current: false },
    { name: "Categories", href: "/categories", current: false },
    isAdmin
      ? { name: "Add Product", href: "/add-products", current: false }
      : { name: "Contact", href: "/contact", current: false },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800 relative">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
              <Bars3Icon className="block h-6 w-6 group-data-open:hidden" />
              <XMarkIcon className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo + desktop links + search */}
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img src={logoLight} alt="SmartBuy" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden sm:ml-6 sm:flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search */}
            <div className="ml-6 hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="px-3 py-1 rounded-md w-64 border border-gray-300 bg-white text-black"
              />
            </div>
          </div>

          {/* Right: Cart + User Menu */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button className="relative rounded-full p-1 text-gray-400 hover:text-white">
              <ShoppingCartIcon className="h-6 w-6" />
            </button>

            {!isLoggedIn && (
              <div className="ml-4 flex gap-4">
                <Link to="/login" className="text-white hover:underline">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:underline">
                  Register
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <Menu as="div" className="relative ml-3">
                <MenuButton className="flex rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="User"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm ${active && "bg-gray-100"}`}
                      >
                        Your profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 text-sm ${active && "bg-gray-100"}`}
                      >
                        Settings
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-2 text-sm ${active && "bg-gray-100"}`}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className="block rounded-md px-3 py-2 text-base text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
