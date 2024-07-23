import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ClientMaster from './components/ClientMaster';
import ClientDetail from './components/ClientDetail';
import Nav from './components/navbar'
import SideBar from './components/sidebar'

function App() {
  const [isMediumDevice, setIsMediumDevice] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumDevice(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const divStyle = {
    width: isMediumDevice ? '100vw' : 'calc(100vw - 21%)'
  };

  return (
    <>
    <Nav/>
    <SideBar/>
    <Router>
        <div style={divStyle} className="absolute md:end-2 md:pl-4 px-4 top-20" >
          <Routes>
            <Route path='/' element={<ClientDetail/>}/>
            <Route path="/newClient" element={<ClientMaster mode="add" />}/>
            <Route path="/editClient/:id" element={<ClientMaster mode="edit" />} />
          </Routes>
        </div>
    </Router>
    </>
  );
}

export default App;
