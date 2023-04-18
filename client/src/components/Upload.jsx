import React, {  useState } from 'react';
import './Upload.css';
import Web3 from 'web3';
import axios from 'axios';
import GoodsContractAbi from '../contracts/GoodsContract.json';
import Cookies from 'js-cookie';
import SellerContractGoods from '../contracts/SellerContractGoods.json';
import config from '../../config';

const API_SECRET = config.ApiSecret;
const API_KEY = config.ApiKey;

     

const Upload =  () => {
    const[sellerName,setSellerName] = useState("");
    const[purchaserName,setPurchaserName] = useState("");
    const[purchaseDate,setPurchaseDate] = useState("");
    const[purchasePrice,setPurchasePrice] = useState("");
    const[image1,setImage1] = useState("");
    const[image2,setImage2] = useState("");
    const[image3,setImage3] = useState("");
    const[image4,setImage4] = useState("");
    const [ipfsHash1, setHash1] = useState(null);
    const [ipfsHash2, setHash2] = useState(null);
    const [ipfsHash3, setHash3] = useState(null);
    const [ipfsHash4, setHash4] = useState(null);
    const [imageUrl1, setImageUrl1] = useState(null);
    const [imageUrl2, setImageUrl2] = useState(null);
    const [imageUrl3, setImageUrl3] = useState(null);
    const [imageUrl4, setImageUrl4] = useState(null);
    const [purchaseId,setPurchaseId] = useState('');
    const [usedPurchaseIds, setUsedPurchaseIds] = useState([]);
    const username = Cookies.get('username');
  
  
    const handleFile1InputChange = (event) => {
      setImage1(event.target.files[0]);
    };
  
    const handleFile2InputChange = (event) => {
      setImage2(event.target.files[0]);
    };
  
    const handleFile3InputChange = (event) => {
      setImage3(event.target.files[0]);
    };
  
    const handleFile4InputChange = (event) => {
      setImage4(event.target.files[0]);
    };

    const handleAddPurchase = async (e) => {
      e.preventDefault();
      
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
     
      let response1;
      if (image1) {
        const formData1 = new FormData();
        formData1.append('file', image1);
  
         response1 = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_SECRET,
          },
        });
      
        setHash1(response1.data.IpfsHash);
     
       
        
        setImageUrl1(`https://gateway.pinata.cloud/ipfs/${response1.data.IpfsHash}`);
  
        await axios.post(
          'https://api.pinata.cloud/pinning/pinJSONToIPFS',
          {
            image: `https://gateway.pinata.cloud/ipfs/${response1.data.IpfsHash}`,
          },
          {
            headers: {
              pinata_api_key: API_KEY,
              pinata_secret_api_key: API_SECRET,
            },
          }
        );
      }

     
      
   let response2;
      
      if (image2) {
        const formData2 = new FormData();
        formData2.append('file', image2);
         response2 = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData2, {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_SECRET,
          },
        });
       
        setHash2(response2.data.IpfsHash);
        setImageUrl2(`https://gateway.pinata.cloud/ipfs/${response2.data.IpfsHash}`);
      
  
        await axios.post(
          'https://api.pinata.cloud/pinning/pinJSONToIPFS',
          {
            image: `https://gateway.pinata.cloud/ipfs/${response2.data.IpfsHash}`,
          },
          {
            headers: {
              pinata_api_key: API_KEY,
              pinata_secret_api_key: API_SECRET,
            },
          }
        );
      }
   
      let response3;
      if (image3) {
        const formData3 = new FormData();
        formData3.append('file', image3);
  
         response3 = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData3, {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_SECRET,
          },
        });
        setHash3(response3.data.IpfsHash);
        setImageUrl3(`https://gateway.pinata.cloud/ipfs/${response3.data.IpfsHash}`);
  
        await axios.post(
          'https://api.pinata.cloud/pinning/pinJSONToIPFS',
          {
            image: `https://gateway.pinata.cloud/ipfs/${response3.data.IpfsHash}`,
          },
          {
            headers: {
              pinata_api_key: API_KEY,
              pinata_secret_api_key: API_SECRET,
            },
          }
        );
      }
    
     let response4
      // Upload first file to Pinata
      if (image4) {
        const formData4 = new FormData();
        formData4.append('file', image4);
  
         response4 = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData4, {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_SECRET,
          },
        });
        setHash4(response4.data.IpfsHash);
        setImageUrl4(`https://gateway.pinata.cloud/ipfs/${response4.data.IpfsHash}`);
  
        await axios.post(
          'https://api.pinata.cloud/pinning/pinJSONToIPFS',
          {
            image: `https://gateway.pinata.cloud/ipfs/${response4.data.IpfsHash}`,
          },
          {
            headers: {
              pinata_api_key: API_KEY,
              pinata_secret_api_key: API_SECRET,
            },
          }
        );
      }




    
      
    //  let usedPurchaseIds = ["0x4c3f2ea3c6b6b819f9bfe550f7b8c43087ce84a6fa6c194edcc0f9b0ffb30eee"];
     const userAddress = "0xdE2d8e62D4624DcfA134e8D6e9e9398cEC2aEb1D";
     const contract = new web3.eth.Contract(GoodsContractAbi.abi,userAddress);  
     
     const abii = SellerContractGoods.abi;
     const sellercontract = new web3.eth.Contract(abii,"0x2BE44C6Bef5cF5554a47c18d60cbbF5E6AD87fC8");
     const val = false;
     const r = await sellercontract.methods.getProduct(purchaseId).call();
    //  setResult(r);
     await sellercontract.methods.verify(purchaseId).call().then(result => {
      if(usedPurchaseIds.includes(purchaseId)){
        alert("This purchase ID has already been used");
      } else if(result && r[3]===purchasePrice){
        setUsedPurchaseIds([...usedPurchaseIds, purchaseId]);
        contract.methods.addPurchase(purchaseId,username,purchasePrice,purchaseDate,sellerName,purchaserName,response1.data.IpfsHash,response2.data.IpfsHash,response3.data.IpfsHash,response4.data.IpfsHash,val).send({from : "0x8256E98ef819D9f30C2C32d29BEC57c84BCF1F62"})
        
      } else{
        alert('Your Id is Invalid');
        
      }
    })
    .catch(error => {
      console.error(error);
    });
    
    
    // setPurchases(r);
    // if(purchases[3]===purchasePrice){
    //   contract.methods.addPurchase(purchaseId,username,purchasePrice,purchaseDate,sellerName,purchaserName,response1.data.IpfsHash,response2.data.IpfsHash,response3.data.IpfsHash,response4.data.IpfsHash,val).send({from : "0x8256E98ef819D9f30C2C32d29BEC57c84BCF1F62"});
    // }else{
    //   alert('Invalid Entries');
    // }
    
     e.preventDefault();
     setPurchaserName('');
     setPurchaseDate('');
     setPurchasePrice('');
     setSellerName('');
     console.log(imageUrl1, imageUrl2,imageUrl3, imageUrl4,ipfsHash1,ipfsHash2,ipfsHash3,ipfsHash4);
    }
    
  return (
    <div id='box'>
       <form id='form'>
       <h2>Upload Your Purchase Details </h2>
       <label for="purchaseid" className='purchaseid'>Purchase Id:</label>
       <input type="text" id="purchaseid" name="sellerName" onChange={(e) => setPurchaseId(e.target.value)}  autocomplete="off"/><br />

       <label for="sellerName" className='seller'>Seller Name:</label>
       <input type="text" id="sellerName" name="sellerName" onChange={(e) => setSellerName(e.target.value)}  autocomplete="off"/><br />

       <label for="purchaserName">Purchaser Name:</label>
       <input type="text" id="purchaserName" name="purchaserName" onChange={(e) => setPurchaserName(e.target.value)}  autocomplete="off"/><br />

       <label for="purchaseDate">Date of Purchase:</label>
       <input type="date" id="purchaseDate" name="purchaseDate" onChange={(e) => setPurchaseDate(e.target.value)}  autocomplete="off" /><br />

       <label for="purchasePrice" className='price'>Price:</label>
       <input type="number" id="purchasePrice" min={0} name="purchasePrice" onChange={(e) => setPurchasePrice(e.target.value)} autocomplete="off" /><br />


       <label for="image1" className='image'>Image 1:</label>
       <input type="file" id="image1" name="image1" onChange={handleFile1InputChange} /><br />

       <label for="image2" className='image'>Image 2:</label>
       <input type="file" id="image2" name="image2" onChange={handleFile2InputChange} /><br />

       <label for="image3" className='image'>Image 3:</label>
       <input type="file" id="image3" name="image3" onChange={handleFile3InputChange} /><br />

       <label for="image4" className='image'>Image 4:</label>
       <input type="file" id="image4" name="image4" onChange={handleFile4InputChange} /><br />

       <button id='btn' type="button" onClick={handleAddPurchase}>Submit</button>
       {/* <label>{user.username}</label> */}
   </form>
  
   {/* {
    (imageUrl1 && imageUrl2 && imageUrl3 && imageUrl4) && <div>
    <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash1}`}>My Image</a>
    <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash2}`}>My Image</a>
    <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash3}`}>My Image</a>
    <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash4}`}>My Image</a>
    </div>
   } */}
 
    </div>
  )
}

export default Upload;




  

  

