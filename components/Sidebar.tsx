import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed right-6 bottom-10 z-50 flex flex-col gap-3">
       <button className="w-10 h-10 bg-white shadow-md border border-gray-100 rounded flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors">
         <span className="text-lg">^</span>
       </button>
       <button className="w-10 h-10 bg-[#FB7299] shadow-md rounded flex items-center justify-center text-white text-xs font-bold hover:bg-[#ff8eb3] transition-colors">
         CS
       </button>
    </div>
  );
};

export default Sidebar;