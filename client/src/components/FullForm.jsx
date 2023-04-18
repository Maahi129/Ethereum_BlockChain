import React, { useState } from 'react';
import Web3 from 'web3';
import abiAuth from '../contracts/AuthContract.json'








export function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [privateNumber, setPrivateNumber] = useState('');
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  const userAccount =  web3.eth.getAccounts()
  console.log(userAccount);
  const address = userAccount[0];
  const abi = abiAuth.output.abi;
  

 

  const handleRegister = async () => {
    

    
      

        const contract = new web3.eth.Contract(abi,address);
        const hashedPassword = await web3.utils.sha3(password);
        const hashedPrivateNumber = await web3.utils.sha3(privateNumber);
        console.log(hashedPassword);
        
        const a =  contract.methods.register(username,hashedPassword,hashedPrivateNumber);
        console.log(a)
        
        
        
    




    // Send username, hashed password, and hashed private number to backend
    // for storage on blockchain

  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Private Number:
        <input type="text" value={privateNumber} onChange={(e) => setPrivateNumber(e.target.value)} />
      </label>
      <button type="button" onClick={handleRegister}>Register</button>
    </form>
  );
}

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [privateNumber, setPrivateNumber] = useState('');

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  const userAccount =  web3.eth.getAccounts().then(console.log);
  const address = userAccount[0];
  const abi = abiAuth.output.abi;
  
  
  
  
    const handleLogin = async () => {
  
      const contract = new web3.eth.Contract(abi,address);
      
      const hashedPassword =  web3.utils.sha3(password);
      const hashedPrivateNumber =  web3.utils.sha3(privateNumber);
  
     var b = await contract.methods.login(username,hashedPassword,hashedPrivateNumber);
     if(b){
        console.log("h");
     }else{
        console.log("e");
     }
  
      // Send username, hashed password, and hashed private number to backend
      // for verification against blockchain data
    };
  
    return (
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Private Number:
          <input type="text" value={privateNumber} onChange={(e) => setPrivateNumber(e.target.value)} />
        </label>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    );
  }
  
  