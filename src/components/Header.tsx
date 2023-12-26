import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BridgeInButton } from './BridgeInButton';

import Logo from "../assets/images/logo.png";

export const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  return (
    <div>
      <nav className='fixed w-full md:px-12 p-0 md:py-6 flex justify-center z-10'>
        <div className='w-full max-w-max-cont md:px-6 px-4 md:py-2 py-4 flex flex-col md:rounded-2xl rounded-none md:border border-b border-solid border-gray-300 bg-white bg-opacity-50 backdrop-blur-lg'>
          <div className='w-full flex flex-row items-center justify-between'>
            <Link to="/" className='flex flex-row items-center gap-2'>
              <img src={Logo} alt="Logo" className=' max-h-6' />
            </Link>
            <div className='hidden md:flex flex-row items-center gap-8'>
              <Link to="/"  className="py-2 text-black-11 text-sm font-medium">
                All Teams
              </Link>
              <Link to="/players"  className="py-2 text-black-11 text-sm font-medium">
                Team Roster
              </Link>
              <Link to="/player_stats"  className="py-2 text-black-11 text-sm font-medium">
                Player Stats
              </Link>
              <Link to="/games"  className="py-2 text-black-11 text-sm font-medium">
                Team Games
              </Link>
            </div>
            <div className="flex flex-row items-center gap-2">
              <BridgeInButton text="Book a Call" onClick={() => console.log("Book a Call")} />
              <div
                className={`md:hidden block text-3xl rounded-md border border-solid ${isMobileMenu ? "border-BridgeIn-purple" : "border-black border-opacity-50"}`}
                onClick={() => setIsMobileMenu(!isMobileMenu)}
              >
                <svg stroke={`${isMobileMenu ? "#8036ff" : "#000000"}`} fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M96 256h320M96 176h320M96 336h320"></path></svg>
              </div>
            </div>
          </div>
          {isMobileMenu
            ? <div className='md:hidden flex flex-col px-2 gap-4 py-2'>
              <Link to="/"  className="text-black-11 text-sm font-medium">
                All Teams
              </Link>
              <Link to="/"  className="text-black-11 text-sm font-medium">
                Team Roster
              </Link>
              <Link to="/"  className="text-black-11 text-sm font-medium">
                Team Games
              </Link>
              <Link to="/"  className="text-black-11 text-sm font-medium">
                Player Stats
              </Link>
            </div>
            : null
          }
        </div>
      </nav>
    </div>
  )
}

export default Header;