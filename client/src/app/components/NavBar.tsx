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

  const handleGithub = () => {
    window.location.assign('https://github.com/Shashankrana5/SudokuAssembly')
  }

  return (
    <nav style={{ backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <div>

        <span style={{ marginRight: '1rem', cursor: 'pointer' }} ><Link href = "/" style ={{color: "white"}}>Home</Link></span>
        <span style={{ marginRight: '1rem', cursor: 'pointer' }} onClick={handleGithub}>About</span>

      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>

        <div className="flex gap-1"style={{ position: 'relative', cursor: 'pointer', display:'flex', justifyContent: "center", alignItems: "center" }} onMouseEnter={() => handleDropdownToggle(true)} onMouseLeave={() => handleDropdownToggle(false)}>
          <Image src={icon} alt="User" style={{ width: '30px', borderRadius: '50%', marginRight: '0.5rem', backgroundColor: "white" }} />
          <span>{localStorage.getItem("username")}</span>
          {isDropdownOpen && (
  <div style={{ position: 'relative' }}>
    <div className='top-4' style={{ position: 'absolute', right: '0', zIndex: 1 }}>

      <div className='block right-2 -top-2' style={{
        width: '0',
        height: '0',
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderBottom: '8px solid #f9f9f9',
        position: 'absolute',

      }}></div>

      {/* Dropdown content */}
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '0.5rem',
        borderRadius: '4px',
        zIndex: 1,
        color: 'black',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
      }} className='flex flex-col'>
        <div><button className='w-28'>Profile</button></div>
        {/* <div><button>Settings</button></div> */}
        <div><button className='w-28' onClick={logout}>Logout</button></div>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </nav>
  );
};

export default NavBar;

