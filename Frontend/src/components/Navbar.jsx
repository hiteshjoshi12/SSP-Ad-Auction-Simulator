import React, { useState } from "react";
import AdRequestForm from "./AdRequestForm";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="bg-gray-900 text-white px-6 py-4 shadow flex items-center justify-between">
        <Link to={"/"} className="text-xl font-semibold" onClick={closeMenu}>
          Admin Panel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <button
            onClick={openModal}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
          >
            Simulate Ad Request
          </button>
          <Link to="/" className="hover:underline text-gray-200" onClick={closeMenu}>
            Dashboard
          </Link>
          <Link to="/dsps" className="hover:underline text-gray-200" onClick={closeMenu}>
            DSPs
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 text-white px-6 py-4 space-y-4 shadow">
          <button
            onClick={() => {
              openModal();
              closeMenu();
            }}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
          >
            Simulate Ad Request
          </button>
          <Link to="/" className="block hover:underline text-gray-200" onClick={closeMenu}>
            Dashboard
          </Link>
          <Link to="/dsps" className="block hover:underline text-gray-200" onClick={closeMenu}>
            DSPs
          </Link>
        </div>
      )}

      {/* Modal */}
      <AdRequestForm isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default NavBar;
