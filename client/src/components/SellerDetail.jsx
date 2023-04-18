import React, { useState } from 'react';
import SellerContractGoods from '../contracts/SellerContractGoods.json';
import Web3 from 'web3';

const SellerDetail = () => {
  const [query,setQuery] = useState('');
  const [display,setDisplay] = useState('');
  const getDisplayPurchases = async(e) => {
     e.preventDefault();
     try{
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const abi = SellerContractGoods.abi;
        const contract = new web3.eth.Contract(abi,"0x2BE44C6Bef5cF5554a47c18d60cbbF5E6AD87fC8");
        await contract.methods.getProduct(query).call().then(result => {
         setDisplay(result);
        })

     }catch(err){
      console.log(err);
     }
  }
  return (
    <div className='detail-container' id='topdiv'>
            <form>
            <label>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <button type="submit" onClick={getDisplayPurchases}>Search</button>
            </form>
            <div id='purchases'>
            <div id='flex'>
            
              <p>Seller Name :{display.sellerName} </p>
              <p>Purchaser Name:{display.purchaserName}</p>
              <p>Date: {display.date}</p>
              <p>Price: {display.price}</p>
              <p>Frined Purchase Id : {display.friendPurchaseId}</p>
            
            </div>
            </div>
       </div>
  )
}

export default SellerDetail
