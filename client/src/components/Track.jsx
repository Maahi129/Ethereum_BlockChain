import React,{useState,useEffect} from 'react'
import UserSold from '../contracts/UserSold.json';
import Web3 from 'web3';
import SellerContractGoods from '../contracts/SellerContractGoods.json';
const Track = () => {

  const [purchaseIds, setPurchaseIds] = useState([]);
  const [newProductIds,setNewProductIds] = useState([]);
  const [purchaseBlocklist, setPurchaseBlocklist] = useState([]);
  const [newProductBlocklist, setNewProductBlocklist] = useState([]);

  const detail = async(e) => {
    e?.preventDefault();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const abi = UserSold.abi;
    const contract = new web3.eth.Contract(abi,'0x499B91AB75d970e5E46F865f5C6821eFecfdd8C2'); 
    const a =  await contract.methods.getAllPurchaseIds().call();
    const [productIdList, newProductIdList] = [a[0],a[1]]
    console.log(a[0]);
     setPurchaseIds(productIdList);
    setNewProductIds(newProductIdList);
    console.log(purchaseIds);


    const abii = SellerContractGoods.abi;
    const contracts = new web3.eth.Contract(abii,"0x2BE44C6Bef5cF5554a47c18d60cbbF5E6AD87fC8");

    const purchaseBlocklist = await Promise.all(
      productIdList.map(async (id) => {
        const isBlocked = await contracts.methods.blocklist(id).call();
        return isBlocked;
      })
    );
    setPurchaseBlocklist(purchaseBlocklist);

    const newProductBlocklist = await Promise.all(
      newProductIdList.map(async (id) => {
        const isBlocked = await contracts.methods.blocklist(id).call();
        return isBlocked;
      })
    );
    setNewProductBlocklist(newProductBlocklist);
    
  };
  
useEffect(() => {
detail();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  return (
    <div id='side'>
    <div>
      <label>From : </label>
      {purchaseIds.map((id, index) => (
        <li key={id}>
          {id} ({purchaseBlocklist[index] ? 'blocked' : 'unblocked'})
        </li>
      ))}
    </div>
    <div>
      <label>To :</label>{' '}
      {newProductIds.map((id, index) => (
        <li key={id}>
          {id} ({newProductBlocklist[index] ? 'blocked' : 'unblocked'})
        </li>
      ))}
    </div>
  </div>
  )
}

export default Track
