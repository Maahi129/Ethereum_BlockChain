import React, { useState, useEffect } from 'react';
import './Seller.css';
import Cookies from 'js-cookie';
import Login from './Login';
import Nav from './Nav';


const Seller = () => {

    
    const [login,setlogin] = useState(true);


    useEffect(() => {
      const a = Cookies.get("sellers");
      if(a === true){
       setlogin(true);
      }
      }, []);
    

          if(login){
            return (
             
              <div>
               <Nav />
             
               
              </div>
            )
          } else {
            <Login />
          }

 
}

export default Seller



