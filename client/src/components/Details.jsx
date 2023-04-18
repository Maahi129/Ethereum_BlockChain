import React, { useState, useEffect } from 'react';
import './Detail.css';
import Web3 from 'web3';
import GoodsContractAbi from '../contracts/GoodsContract.json';
import Cookies from 'js-cookie';
import { Pagination } from 'semantic-ui-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

//import SellerContractGoods from '../contracts/SellerContractGoods.json';

const Details = () => {

  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [yourId, setId] = useState();
  const [query, setQuery] = useState("");
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const username = Cookies.get('username');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handlePageChange = (event, { activePage }) => {
    setCurrentPage(activePage);
  };

  // const handleShareButtonClick = async () => {
  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: "hey",
  //         text: `I found this product and you might be interested!`,
  //         url: `http://localhost:8080`,
  //         yourId:yourId
  //       });
  //       console.log('Shared successfully');
  //     } catch (error) {
  //       console.error('Error sharing:', error);
  //     }
  //   } else {
  //     console.log('Web Share API not supported');
  //   }
  // };


  const fetchPurchases = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const userAddress = "0xdE2d8e62D4624DcfA134e8D6e9e9398cEC2aEb1D";
    const contract = new web3.eth.Contract(GoodsContractAbi.abi, userAddress);
    let purchaseCount = await contract.methods.purchaseCounter(username).call();
    setId(purchaseCount);
    const fetchedPurchases = [];
    for (let i = 1; i <= purchaseCount; i++) {
      const purchase = await contract.methods.getPurchaseById(username, i).call();
      fetchedPurchases.push(purchase);
      console.log(purchase);
    }
    setPurchaseDetails(fetchedPurchases);
    //console.log(purchase.sold);
  };

  useEffect(() => {
    fetchPurchases();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(yourId);
  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = query.toLowerCase();
    const filteredPurchases = purchaseDetails.filter(
      (purchase) =>
        purchase.uniqueId.toLocaleLowerCase().includes(searchQuery) ||
        purchase.purchaseId.toLocaleLowerCase().includes(searchQuery) ||
        purchase.sellerName.toLowerCase().includes(searchQuery) ||
        purchase.purchaserName.toLowerCase().includes(searchQuery) ||
        purchase.date.toLowerCase().includes(searchQuery) ||
        purchase.price.toLowerCase().includes(searchQuery)
    );
    setFilteredPurchases(filteredPurchases);
   
  };

  const generatePDF = () => {
    const doc = new jsPDF("p","mm",[297,210]);

    doc.autoTable({
      head: [['Id', 'Price', 'Date', 'SellerName','soldOut']],
      body: purchaseDetails.map(purchase => [purchase.uniqueId, purchase.price, purchase.date, purchase.sellerName,purchase.sold.toString()])
    });
  
    doc.save('purchases.pdf');
  };
  

  const getDisplayPurchases = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(purchaseDetails);
    const currentPurchases = filteredPurchases.length > 0 ? filteredPurchases : purchaseDetails;
    return currentPurchases.slice(startIndex, endIndex).map((purchase, index) => (
      <div id='detaildiv'>
      <div id='flexdiv' key={index}>
        <div>
          <img  src={`https://gateway.pinata.cloud/ipfs/${purchase.image1Hash}`} alt=''></img>
          <p>Order No: {purchase.purchaseId}</p>
          <hr />
          <p id='more'>Purchase Id: {purchase.uniqueId}</p>
          <hr />
          <p>Seller Name: {purchase.sellerName}</p>
          <hr />
          <p>Purchaser Name: {purchase.purchaserName}</p>
          <hr />
          <p>Price: {purchase.price}</p>
          <hr />
          <p>Date: {purchase.date}</p>
          <hr />
          <p>Sold :{purchase.sold.toString()}</p>
          

          <a id='anchor' href={`https://gateway.pinata.cloud/ipfs/${purchase.image2Hash}`} target='_blank' rel="noopener noreferrer">Image2</a>
          <a id='anchor' href={`https://gateway.pinata.cloud/ipfs/${purchase.image3Hash}`} target='_blank' rel="noopener noreferrer">Image3</a>
          <a id='anchor' href={`https://gateway.pinata.cloud/ipfs/${purchase.image4Hash}`} target='_blank' rel="noopener noreferrer">Image3</a>   
          </div>
          </div> </div>  ));
          };
 return (
            <div className='detail-container' id='topdiv'>
            <form onSubmit={handleSearch}>
            <label>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <button type="submit">Search</button>
            <button id='download' onClick={generatePDF}>Download</button>
            </form>
            <div id='purchases'>
            {getDisplayPurchases()}
            </div>
            <Pagination
                 onPageChange={handlePageChange}
                 defaultActivePage={currentPage}
                 className='page'
                 totalPages={Math.ceil(filteredPurchases.length > 0 ? filteredPurchases.length / itemsPerPage : purchaseDetails.length / itemsPerPage)}
            />
            {/* <button onClick={handleShareButtonClick} /> */}
            </div>
            );
            };
            
            export default Details;
            
            
            
            
            
       