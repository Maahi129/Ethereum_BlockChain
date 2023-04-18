import React, { useState } from 'react';
import Web3 from 'web3';
import SellerContractGoods from '../contracts/SellerContractGoods.json';
import './Blocka.css';

const Blocka = () => {
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const blocked = async (e) => {
        e.preventDefault();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const abi = SellerContractGoods.abi;
        const contract = new web3.eth.Contract(abi,"0x2BE44C6Bef5cF5554a47c18d60cbbF5E6AD87fC8");
        console.log(input);
        await contract.methods.blockProduct(input)
            .send({ from: '0x8256E98ef819D9f30C2C32d29BEC57c84BCF1F62'}) // replace with your own account address
        
    };

    const unblock = async (e) => {
        e.preventDefault();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const abi = SellerContractGoods.abi;
        const contract = new web3.eth.Contract(abi,"0x2BE44C6Bef5cF5554a47c18d60cbbF5E6AD87fC8");
        await contract.methods.unblockProduct(input)
            .send({ from: '0x8256E98ef819D9f30C2C32d29BEC57c84BCF1F62', gas: 1000000 }) // replace with your own account address
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error(error);
            });
        
    };

    return (
        <div>
            <label>Block/UnBlock :</label>
            <input type='text' id='blockid' value={input} onChange={handleInputChange}></input>
            <div id='blockbtn'>
                <button id='blk1' onClick={blocked}>Block</button>
                <button id='blk1' onClick={unblock}>UnBlock</button>
            </div>
        </div>
    )
}

export default Blocka;
