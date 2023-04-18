import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import AuthContract from '../contracts/Auth.json';
import './Login.css'
import Navbar from './navele';
import SellerContract from '../contracts/Seller.json';
//import Upload from './Upload';
//import { selectUser } from '../features/userSlice';
//import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import Seller from './Seller';

import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [privateNumber, setPrivateNumber] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hashedPassword,setHashedPassword] = useState('');
  const [hashedPrivateNumber,setHashedPrivateNumber] = useState('');
  const [sellers,setSellers] = useState(false);

  useEffect(() => {
    const loggedInStatus = Cookies.get("username");
    if (loggedInStatus) {
      setLoggedIn(true);
    }
  }, []);

  const dispatch = useDispatch();
  dispatch(login({
    username:username
  }));
  
  console.log(username);
  console.log(hashedPassword,hashedPrivateNumber);
const handleLogin = async (e) => {
    try {
      e.preventDefault();
    
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const abi = AuthContract.abi;
    const contract = new web3.eth.Contract(abi,'0x269d8D19273FAB09663e359b2a88078E2BD13263');  
    const hashedPass = web3.utils.keccak256(password);
    const hashedPrivateNum = web3.utils.keccak256(privateNumber);
    const result = await contract.methods.login(username, hashedPass,hashedPrivateNum ).call();
    const loginTime = new Date().toLocaleTimeString();
      if ( result ) {
        Cookies.set("username", username,{ expires: 1 });
        Cookies.set("time",loginTime);
        setLoggedIn(true);
      } else {
        setErrorMessage('Invalid credentials');
        alert('Invalid Credentials');
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error.message);
    }
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const abi = AuthContract.abi;
    const contract = new web3.eth.Contract(abi,'0x269d8D19273FAB09663e359b2a88078E2BD13263');  

      const hashedPassword = web3.utils.keccak256(password);
      const hashedPrivateNumber = web3.utils.keccak256(privateNumber);
      setHashedPassword(hashedPassword);
      setHashedPrivateNumber(hashedPrivateNumber);
      await contract.methods.register(username, hashedPassword, hashedPrivateNumber).send({ from: '0x8256E98ef819D9f30C2C32d29BEC57c84BCF1F62' });

     
      setLoggedIn(false);
      e.preventDefault();
      setUsername('');
      setPassword('');
      setPrivateNumber('');
      
    } catch (error) {
      setErrorMessage(error.message);
      console.log(errorMessage);
    }
  };

  
  const sellerhandle = async(e) => {
    e.preventDefault();
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const abi = SellerContract.abi;
      const contract = new web3.eth.Contract(abi,"0xe95317E17A7fE7e6507d371eb59316A85819d7BE");
      const acc = await web3.eth.getAccounts();

       //await contract.methods.addSeller("0xF7005daC6A616E4DAccf1B6C56A1422630e58805").send({from: "0xF7005daC6A616E4DAccf1B6C56A1422630e58805"});
        const a = await contract.methods.login(acc[0]).call();
        if(a){
          Cookies.set("sellers","true");
          setSellers(true);
         setLoggedIn(true);
        }else {
          alert('Your are not a seller!!')
        }

    } catch(err) {
      console.log(err);
    }
  }
  
  

  if (loggedIn) {
     if (sellers){
      return (
        <div> 
        <Seller />
        </div>
      );
     }else{
      return (
        <div>
           <Navbar />
        </div>
      );

     }
  } else {
    return (
      <div className='auth-form-container'>
      <form className='login-form'>
        <h1>Login/Register</h1>
        <div>
          <label id='usrname'>Username:</label>
          <input id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)}  autocomplete="off" />
        </div>
        <div>
          <label id='usrname'>Password:</label>
          <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}  autocomplete="off"/>
        </div>
        <div>
          <label id='usrname'>Private Number:</label>
          <input id='private' type="number" value={privateNumber} onChange={(e) => setPrivateNumber(e.target.value)}  autocomplete="off" />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <div id='buttons'>
        <button id='btn' className='b1' type="submit" onClick={handleLogin}>Login</button>
        <button id='btn' className='b2' type="submit" onClick={handleRegister}>Register</button>
        <div >
        <button id='sellerbtn'  type='submit' onClick={sellerhandle}>Login as Seller</button>
        </div>
        </div>
      </form>
    
      </div>
    );
  }


 
}

export default Login;
