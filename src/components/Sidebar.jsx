import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import SidebarChat from './SidebarChat';

const Sidebar = () => {
  return (
    <div className="bg-slate-800 text-white">
      <Navbar />
      <Search />
      <SidebarChat />
    </div>
  );
};

export default Sidebar;
