import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-16 bg-gray-900 border-r border-gray-800 flex flex-col py-4 gap-2">
      <div className="sidebar-item active group relative flex items-center justify-center w-full h-12 cursor-pointer transition-all hover:bg-gray-800">
        <svg className="w-6 h-6 fill-gray-400 transition-all group-hover:fill-green-500 group-[.active]:fill-green-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-green-500 rounded-r-sm"></span>
      </div>
      <div className="sidebar-item group relative flex items-center justify-center w-full h-12 cursor-pointer transition-all hover:bg-gray-800">
        <svg className="w-6 h-6 fill-gray-400 transition-all group-hover:fill-green-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
        </svg>
      </div>
      <div className="sidebar-item group relative flex items-center justify-center w-full h-12 cursor-pointer transition-all hover:bg-gray-800">
        <svg className="w-6 h-6 fill-gray-400 transition-all group-hover:fill-green-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      </div>
      <div className="sidebar-item group relative flex items-center justify-center w-full h-12 cursor-pointer transition-all hover:bg-gray-800 mt-auto">
        <svg className="w-6 h-6 fill-gray-400 transition-all group-hover:fill-green-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>
      </div>
    </div>
  );
};

export default Sidebar;