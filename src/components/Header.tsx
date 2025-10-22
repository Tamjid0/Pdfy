import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] h-16 flex items-center justify-between px-8 border-b border-green-500/[.1] shadow-lg z-50">
      <div className="flex items-center gap-12">
        <div className="text-2xl font-bold text-[#00ff88] tracking-tight flex items-center gap-2">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          PDFy
        </div>
        <nav className="flex gap-2">
          <a className="text-gray-400 hover:text-[#00ff88] hover:bg-green-500/[.1] px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer active:text-[#00ff88] active:bg-green-500/[.15]">Dashboard</a>
          <a className="text-gray-400 hover:text-[#00ff88] hover:bg-green-500/[.1] px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer">Projects</a>
          <a className="text-gray-400 hover:text-[#00ff88] hover:bg-green-500/[.1] px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer">Templates</a>
          <a className="text-gray-400 hover:text-[#00ff88] hover:bg-green-500/[.1] px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer">Community</a>
        </nav>
      </div>
      <div className="flex gap-3 items-center">
        <button className="bg-[#1a1a1a] text-white border border-[#333] px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all flex items-center gap-2 hover:bg-[#252525] hover:border-[#00ff88] hover:-translate-y-px" onClick={() => alert('Import Chat - Coming Soon')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
            <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
          </svg>
          Import Chat
        </button>
        <button className="bg-[#1a1a1a] text-white border border-[#333] px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all flex items-center gap-2 hover:bg-[#252525] hover:border-[#00ff88] hover:-translate-y-px" onClick={() => alert('Save Project - Coming Soon')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
          </svg>
          Save Project
        </button>
        <button className="bg-[#00ff88] text-black border-none px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all shadow-md shadow-green-500/[.3] hover:bg-[#00dd77] hover:shadow-lg hover:shadow-green-500/[.4] hover:-translate-y-px flex items-center gap-2" onClick={() => alert('Export PDF - Coming Soon')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          Export PDF
        </button>
        <div className="flex items-center gap-3 px-3 py-1.5 bg-[#1a1a1a] border border-[#333] rounded-full cursor-pointer transition-all ml-3 hover:border-[#00ff88] hover:bg-[#252525]" onClick={() => alert('Profile Menu - Coming Soon')}>
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc66] flex items-center justify-center font-semibold text-sm text-black">JD</div>
            <div className="w-2 h-2 bg-[#00ff88] rounded-full border-2 border-[#1a1a1a] absolute bottom-0 right-0"></div>
          </div>
          <span className="text-sm font-medium text-white">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
