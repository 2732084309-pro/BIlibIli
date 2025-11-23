import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, UploadIcon, MenuIcon, CloseIcon } from './Icons';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full">
      {/* Desktop & Mobile Main Bar */}
      <div className="max-w-[1800px] mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
          
          <Link to="/" className="flex items-center gap-2">
             <div className="w-10 h-10 bg-[#FB7299] rounded-lg flex items-center justify-center text-white font-bold text-xl">
               B
             </div>
             <span className="hidden md:block font-bold text-xl text-[#FB7299] tracking-tight">Bilibili</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-[#FB7299] transition-colors">Home</Link>
            <a href="#" className="hover:text-[#FB7299] transition-colors">Anime</a>
            <a href="#" className="hover:text-[#FB7299] transition-colors">Gaming</a>
            <a href="#" className="hover:text-[#FB7299] transition-colors">Tech</a>
            <a href="#" className="hover:text-[#FB7299] transition-colors">Variety</a>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-lg mx-4">
          <div className="relative w-full group">
            <input 
              type="text" 
              placeholder="Search videos, users..." 
              className="w-full bg-gray-100 border border-transparent group-hover:bg-white group-hover:border-[#e3e5e7] focus:bg-white focus:border-[#FB7299] focus:outline-none rounded-full py-2 pl-4 pr-10 transition-all text-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FB7299] p-1">
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
             <img 
               src="https://picsum.photos/seed/user_avatar/40/40" 
               alt="User" 
               className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200"
             />
          </div>
          <button className="hidden md:flex flex-col items-center text-[10px] text-gray-500 hover:text-[#FB7299]">
             <span className="text-xs">Dynamic</span>
          </button>
          <button className="hidden md:flex flex-col items-center text-[10px] text-gray-500 hover:text-[#FB7299]">
             <span className="text-xs">Favorites</span>
          </button>
          <button className="bg-[#FB7299] hover:bg-[#ff8eb3] text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <UploadIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 px-4 py-4 shadow-lg">
          <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-700">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:bg-gray-50 rounded">Home</Link>
            <div className="py-2 hover:bg-gray-50 rounded">Anime</div>
            <div className="py-2 hover:bg-gray-50 rounded">Gaming</div>
            <div className="py-2 hover:bg-gray-50 rounded">Tech</div>
            <div className="py-2 hover:bg-gray-50 rounded">Music</div>
            <div className="py-2 hover:bg-gray-50 rounded">Dance</div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;