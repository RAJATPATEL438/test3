import React, { useState, useEffect, useRef } from 'react';
import SideBarToggle from './sidebarToggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faLock, faBars, faCalendar, faPhone, faUserAlt} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="h-16 w-full bg-blue-500 fixed flex items-center justify-between md:px-12 px-4 top-0 z-10">
        
        <div className="font-bold text-2xl cursor-pointer flex items-center">
          <span className="text-white text-lg font-semibold">Best CRM</span>
        </div>

        <div className="hidden md:flex items-center justify-center flex-1">
          <span className="text-white text-lg font-semibold">Soltrack Technologies Pvt Ltd</span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <span className='text-normal text-white'>F.Y : 2024-25</span>
          <div className="relative" onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
            <button className="text-white" onClick={toggleUserMenu}>
              <FontAwesomeIcon icon={faUser} className="h-8 w-8 rounded-full text-white" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 w-48 rounded-md shadow-lg bg-gray-300 ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                    <FontAwesomeIcon icon={faUserAlt} className="mr-2" />
                    User
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    F.Y : 2024-25
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Change Password
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    Support
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center">
          {!isOpen && (
            <button onClick={toggleMenu} className="text-white">
              <FontAwesomeIcon icon={faBars} className="h-8 w-8" />
            </button>
          )}
        </div>

      </nav>

      {isOpen && <div className="fixed inset-0 z-10 bg-black opacity-75"></div>}

      <div ref={sidebarRef} className={`md:hidden ${isOpen ? 'block' : 'hidden'} fixed overflow-auto z-20 bg-white top-0 h-full w-4/5 left-0 transition-transform duration-500`}>
        
        <div className="px-4 py-4 text-white bg-blue-500 flex gap-4">
          <div className='bg-white rounded-full flex items-center justify-center w-20 h-20'>
            <img src="/office.png" className='w-12' />
          </div>
          <div>
            <span className="block font-semibold text-base">Soltrack Technologies Pvt Ltd</span>
            <span className="block text-sm font-semibold text-gray-300">9978817201</span>
          </div>
        </div>

        <div className="flex flex-col text-black divide-y-[1px] border-b-2 border-blue-500">
          <div className="flex items-center gap-4 p-4">
            <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
            <span className="">User Name</span>
          </div>
          <div className="flex items-center gap-4 p-4">
            <FontAwesomeIcon icon={faCalendar} className="h-5 w-5" />
            <span className="">F.Y. : 2024-25</span>
          </div>
        </div>

        <SideBarToggle/>

      </div>
    </>
  );
}

export default Navbar;
