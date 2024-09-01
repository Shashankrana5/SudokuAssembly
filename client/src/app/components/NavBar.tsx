"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import icon from "../../assets/user_icon.jpg"
import Link from 'next/link';
import { useUserContext } from '../hooks/useUserContext';
import { useRouter } from 'next/navigation';


const NavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  const router = useRouter();

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    location.reload()
    router.push("/")
  }


  const [isOpen, setOpen] = useState(false);

  const handleDropDown = (status?: boolean) => {
    if (status !== undefined) {
      setOpen(status);
    } else
      setOpen(!isOpen);

  };

  const handleGithub = () => {
    window.location.assign('https://github.com/Shashankrana5/SudokuAssembly')
  }

  return (
    <nav style={{ backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <div>

        <span style={{ marginRight: '1rem', cursor: 'pointer', color: "white" }} ><Link href="/" className='self-center text-lg font-semibold whitespace-nowrap !text-white'>Home</Link></span>
        <span style={{ marginRight: '1rem', cursor: 'pointer' }} className='self-center text-lg font-semibold whitespace-nowrap text-white' onClick={handleGithub}>About</span>

      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>

        <div className="dropdown"
          onMouseEnter={() => handleDropDown(true)}
          onMouseLeave={() => handleDropDown(false)}>
          <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
            <Image src={icon} alt="user icon" className='h-8 w-8 rounded-full bg-white' />
            <span className="self-center text-lg font-semibold whitespace-nowrap text-white">{localStorage.getItem("username")}</span>
          </div>
          <div
            id="dropdown"className={`absolute right-1 z-50 rounded ${isOpen ? "block" : "hidden"
              }`}
          >
            <div className=" z-10 my-1 max-w-44 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow " id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 ">{localStorage.getItem("username")}</span>
                <span className="block text-xs  text-gray-500 truncate ">{localStorage.getItem("email")}</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                </li>
                <li>
                  <button onClick={logout} className="block w-full px-4 text-left py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

