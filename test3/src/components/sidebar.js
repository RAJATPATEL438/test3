import React from 'react';
import SideBarToggle from './sidebarToggle'

function Sidebar() {
  
  return (
    <>
      <div style={{ height: 'calc(100vh - 4rem)'}} className="md:flex flex-col w-1/5 fixed top-16 hidden border-r-2 border-black"> 
        <SideBarToggle/>
      </div>   
    </>
  )
}

export default Sidebar