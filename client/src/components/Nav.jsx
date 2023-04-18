import React, {useState} from 'react'
import Bill from './Bill';
import Track from './Track';
import SellerDetail from './SellerDetail';
import SellerDash from './SellerDash';
import Cookies from 'js-cookie';

const Nav = () => {

  const [activeOption, setActiveOption] = useState('dashboard');
  
  const logout = () => {
    Cookies.remove("sellers");
    window.location.href= '/';
  }
 

  return (
    <div id='navdiv'>
       
    <nav>
   
      <ul className='navigation'>

        <li>
          <a href="/#" onClick={() => setActiveOption('dashboard')}>
            Dashboard
          </a>
        </li>
        <li>
          <a href="/#" onClick={() => setActiveOption('bill')}>
            Billing
          </a>
        </li>
        <li>
          <a href="/#" onClick={() => setActiveOption('track')}>
            Track
          </a>
        </li>
        <li>
          <a href="/#" onClick={() => setActiveOption('sellerdetail')}>
            Details
          </a>
        </li>
        <li>
            <button className='logout' onClick={logout}>Log Out</button>
          </li>
      </ul>
    </nav>

    {activeOption === 'dashboard' && <SellerDash/>}
    {activeOption === 'bill' && <Bill />}
    {activeOption === 'track' && <Track />}
    {activeOption === 'sellerdetail' && <SellerDetail />}
  </div>
  )
}

export default Nav
