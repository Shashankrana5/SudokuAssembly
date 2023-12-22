"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import icon from "../../assets/user_icon.jpg"
import Link from 'next/link';
import { useUserContext } from '../hooks/useUserContext';


const NavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  const handleGithub = () => {
    window.location.assign('https://github.com/Shashankrana5/SudokuAssembly')
  }
  // const { currentUser} = useUserContext()
//   useEffect(() => {
// console.log(currentUser)
//   }, [currentUser])

  return (
    <nav style={{ backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <div>

        <span style={{ marginRight: '1rem', cursor: 'pointer' }} ><Link href = "/" style ={{color: "white"}}>Home</Link></span>
        <span style={{ marginRight: '1rem', cursor: 'pointer' }} onClick={handleGithub}>About</span>

      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>

        <div style={{ position: 'relative', cursor: 'pointer', display:'flex', gap: "0.5rem", justifyContent: "center", alignItems: "center" }} onMouseEnter={() => handleDropdownToggle(true)} onMouseLeave={() => handleDropdownToggle(false)}>
          <Image src={icon} alt="User" style={{ width: '30px', borderRadius: '50%', marginRight: '0.5rem', backgroundColor: "white" }} />
          <span>{localStorage.getItem("username")}</span>
          {isDropdownOpen && (
            <div style={{ position: 'absolute', top: '100%', right: '0', backgroundColor: '#f9f9f9', padding: '0.5rem', borderRadius: '4px', zIndex: 1 }}>
              <span>Profile</span>
              <span>Settings</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

