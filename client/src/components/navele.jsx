import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Upload from './Upload';
import Details from './Details';
import './navele.css';
import Cookies from 'js-cookie';
import SoldUser from './soldUser';
import Block from './Blocka';


function Navbar() {
  const [activeOption, setActiveOption] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  useEffect(() => {
    const username = Cookies.get('username');
    if(username){
      setIsLoggedIn(true);
    }
  },[])

  const logout = () => {
    Cookies.remove('username');
    setIsLoggedIn(false);
    window.location.href = '/';
  }
   
  if (!isLoggedIn) {
    return <div>Loading...</div>
  }

  
  

  return (
    <div id='navdiv'>
       
      <nav>
     
        <ul className='navigation'>
          <h2>Ethereum</h2>
          
          <li>
            <a href="/#" onClick={() => setActiveOption('dashboard')}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="/#" onClick={() => setActiveOption('upload')}>
              Upload
            </a>
          </li>
          <li>
            <a href="/#" onClick={() => setActiveOption('details')}>
              Details
            </a>
          </li>
          <li>
            <a href="/#" onClick={() => setActiveOption('solduser')}>
              Sold
            </a>
          </li>
          <li>
            <a href="/#" onClick={() => setActiveOption('block')}>
              Status
            </a>
          </li>
          <li>
            <button className='logout' onClick={logout}>Log Out</button>
          </li>
        </ul>
      </nav>

      {activeOption === 'dashboard' && <Dashboard/>}
      {activeOption === 'upload' && <Upload />}
      {activeOption === 'details' && <Details />}
      {activeOption === 'solduser' && <SoldUser />}
      {activeOption === 'block' && <Block />}
    </div>
  );
}
export default Navbar;