// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

pragma experimental ABIEncoderV2;

contract GoodsContract {
    struct Goods {
        uint purchaseId;
        bytes32 uniqueId;
        uint price;
        string date;
        string sellerName;
        string purchaserName;
        string image1Hash;
        string image2Hash;
        string image3Hash;
        string image4Hash;
        bool sold;
    }

    mapping (uint => mapping(string => Goods)) private purchases;
    mapping (string => uint) private purchaseCounters;
    Goods[] transactions;

    function addPurchase(bytes32 uniqueId, string memory username, uint price, string memory date, string memory sellerName, string memory purchaserName, string memory image1Hash, string memory image2Hash, string memory image3Hash, string memory image4Hash, bool sold) public {
        uint counter = purchaseCounters[username] + 1;
        Goods memory newPurchase = Goods(counter, uniqueId, price, date, sellerName, purchaserName, image1Hash, image2Hash, image3Hash, image4Hash, sold);
        transactions.push(newPurchase);
        purchases[counter][username] = newPurchase;
        purchaseCounters[username] = counter;
    }

    function getPurchaseById(string memory username, uint purchaseId) public view returns (Goods memory) {
        return purchases[purchaseId][username];
    }

    function purchaseCounter(string memory username) public view returns (uint) {
        return purchaseCounters[username];
    }
    
    function updatePurchaseSold(bytes32 uniqueId, string memory username) public {
        for (uint i=0; i<transactions.length; i++) {
            if (transactions[i].uniqueId == uniqueId) {
                transactions[i].sold = true;
                Goods storage purchase = purchases[transactions[i].purchaseId][username];
                purchase.sold = true;
                break;
            }
        }
    }
}
