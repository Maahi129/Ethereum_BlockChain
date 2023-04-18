import React, { useState } from 'react'
import './soldUser.css';
import UserSold from '../contracts/UserSold.json';
import Web3 from 'web3';
import SellerContractGoods from '../contracts/SellerContractGoods.json';
import GoodsContractAbi from '../contracts/GoodsContract.json';
const SoldUser = () => {
    const [email,setEmail] = useState('');
    const [from,setFrom] = useState('');
    const [to,setTo] = useState('');
    const [date,setDate] = useState('');
    const [price,setPrice] = useState();
    const [id, setId] = useState('');

    const handle = async(e) => {
        e.preventDefault();
        console.log(email);
        try{
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const abi = UserSold.abi;
    const contract = new web3.eth.Contract(abi,'0x499B91AB75d970e5E46F865f5C6821eFecfdd8C2'); 
    // const arr = [];
    let newProductId;
    await contract.methods.makePurchase(from,to,date,price,id).send({from:"0x8256E98ef819D9f30C2C32d29BEC57c84BCF1F62"})
    .on('receipt', function(receipt) {
      console.log('Receipt:', receipt);
      const events = receipt.events;
      const productId = events.PurchaseMade.returnValues.productId;
      newProductId = events.PurchaseMade.returnValues.newProductId;
      console.log('Return Values:', productId, newProductId);
  });
    // await contract.methods.makePurchase(from,to,date,price,id).call().then(result => {
    //   console.log(result);
    //   for(let i=0;i<2;i++){
    //     arr.push(result);
    //   }
    // });
  //  console.log(arr[0][1]);
    // const b = arr[0][1];
    const abii = SellerContractGoods.abi;
   const contracts = new web3.eth.Contract(abii,"0x2BE44C6Bef5cF5554a47c18d60cbbF5E6AD87fC8");
    await contracts.methods.addFriendPurchase(id, newProductId)
    .send({ from: '0x8256E98ef819D9f30C2C32d29BEC57c84BCF1F62', gas: 1000000 }) 
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
    const s = await contracts.methods.verify(newProductId).call();
    console.log(s);
    const userAddress = "0xdE2d8e62D4624DcfA134e8D6e9e9398cEC2aEb1D";
    const contractss = new web3.eth.Contract(GoodsContractAbi.abi, userAddress);
    await contractss.methods.updatePurchaseSold(id,from).send({from:"0x8256E98ef819D9f30C2C32d29BEC57c84BCF1F62"});
    // console.log(b);
    const sub = "Your_Purchase_ID";
    const message = `Hello ${to}, your purchase id is ${newProductId}, price of your product is ${price} (!!WARNING: DONT SHARE IT WITH ANYONE) `;
    const mailtoLink = `mailto:${email}?subject=${sub}&body=${message}`;
    window.location.href = mailtoLink;
    const g = await contracts.methods.getProduct(id).call();
    console.log(g);
    console.log(g.purchaserName);
        }catch(err){
            console.log(err);
        }
    }

    


  return (
    <div>
      <form id='sellergooddiv'>
                <h1 id='h1'>Enter Consumer Product Details :</h1>
                <label id='label'>Id :</label>
                <input type='text' id='sellerSeller' name='user_name' onChange={(e) => setId(e.target.value)} required autocomplete="off"></input>
                <label id='label'>From :</label>
                <input type='text' id='sellerSeller' name='user_name' onChange={(e) => setFrom(e.target.value)} required autocomplete="off"></input>
                <label id='label'>To :</label>
                <input type='text' id='sellerPurchaser' onChange={(e) => setTo(e.target.value)} required autocomplete="off"></input>
                <label id='label'>Date :</label>
                <label>:</label>
                <input type='date' id='id'  onChange={(e) => setDate(e.target.value)} ></input>
                <label id='label'>Price :</label>
                <input type='number' min={0} id='sellerprice' name='message' onChange={(e) => setPrice(e.target.value)} required autocomplete="off"></input>
                <label id='label'>Email :</label>
                <input type="email"  name='user_email' onChange={(e) => setEmail(e.target.value)} required autocomplete="off"></input>
                <button type='submit' id='send' onClick={handle} >Send</button>
                </form>
         </div>
  )
}

export default SoldUser
