import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TbWritingSign } from "react-icons/tb";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="w-full bg-white flex justify-center">
        <nav className="w-full max-w-6xl flex relative justify-between items-center px-4 h-20">
          {/* logo */}
          <Link className="_o6689fn" to="/">
            <div className="inline-flex">
              <div className="hidden md:block">
                <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold tracking-tight text-gray-900">
                  Write Something
                </h1>
              </div>
            </div>
          </Link>
          {/* end logo */}
          {/* search bar */}
          <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
            <div className="inline-block">
              <div className="inline-flex items-center max-w-full">
                <button
                  className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1 py-1"
                  type="button"
                >
                  <div className="block flex-grow overflow-hidden">
                    <input
                      type="text"
                      value="Start your search"
                      className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-900"
                    />
                  </div>
                  <div className="flex items-center justify-center relative h-8 w-8 rounded-full">
                    <IoIosSearch />
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* end search bar */}
          {/* hamburger menu */}

          {/* end hamburger menu */}
          {/* login */}
          <div className="flex-initial">
            <div className="flex justify-end items-center relative">
              <div className="flex mr-4 items-center">
                <Link
                  to="/register"
                  className="hidden sm:inline-block py-2 px-3 hover:bg-gray-200 rounded-full"
                >
                  <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                    Become a writer
                  </div>
                </Link>

                <div className="block relative">
                  <div className="flex items-center h-5 mr-8">
                    <div className="_xpkakx">
                      <TbWritingSign />
                    </div>
                  </div>
                </div>
                <div className="flex-initial py-0">
                  <button
                    className="block sm:hidden"
                    onClick={toggleMenu}
                    type="button"
                  >
                    <MdOutlineMenu className="text-3xl text-gray-900" />
                  </button>
                </div>
              </div>
              {/* hamburger menu items */}
              {isMenuOpen && (
                <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg mt-2 py-2 w-40">
                  {/* Add your menu items here */}
                  <div className="px-4 py-2">Menu Item 1</div>
                  <div className="px-4 py-2">Menu Item 2</div>
                  <div className="px-4 py-2">Menu Item 3</div>
                </div>
              )}
              {/* end hamburger menu items */}
            </div>
          </div>
          {/* end login */}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
