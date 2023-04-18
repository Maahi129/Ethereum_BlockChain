import React, { useEffect, useState } from 'react';
import GoodsContractAbi from '../contracts/GoodsContract.json';
import Web3 from 'web3';
import Cookies from 'js-cookie';
import './Dashboard.css'

const Dashboard = () => {

  const username = Cookies.get('username');
  const time = Cookies.get("time");
  const [purchaseCount, setPurchaseCount] = useState();
  const pc = async() => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const userAddress = "0xdE2d8e62D4624DcfA134e8D6e9e9398cEC2aEb1D";
    const contract = new web3.eth.Contract(GoodsContractAbi.abi,userAddress);
    let purchaseCount = await contract.methods.purchaseCounter(username).call();
    setPurchaseCount(purchaseCount);
  }

  useEffect(() => {
    pc();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
   
  return (
    <div>
      <h1 className='welcome'>Welcome</h1>
      <div id='dashfull'>
      <div className='userdiv'>
      <h1>User Id </h1>
      <p>{username}</p>
      </div>
      <div className='userdiv'>
      <h1>Purchases </h1>
      <p>{purchaseCount}</p>
      </div>
      <div className='userdiv'>
      <h2>Logged In Time </h2>
      <p>{time}</p>
      </div>
      </div>
    </div>
  )
}

export default Dashboard;
