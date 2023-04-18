// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserSold {
    struct Purchase {
        uint uniqueid;
        string from;
        string to;
        string date;
        uint price;
        bytes32 productId;
        bytes32 newProductId;
    }
    
    uint private currentProductId;
    mapping (uint => Purchase) private purchases;
    mapping (bytes32 => bool) private usedProductIds;

    event PurchaseMade(bytes32 indexed productId, bytes32 indexed newProductId, uint uniqueid, string from, string to, string date, uint price);
    event PurchaseIdsListed(bytes32[] productIdList, bytes32[] newProductIdList);
    
    function makePurchase(string memory from, string memory to, string memory date, uint price, bytes32 productId) public returns (bytes32, bytes32) {
        require(!usedProductIds[productId], "Product ID already used");
        usedProductIds[productId] = true;
        
        currentProductId++;
        bytes32 hash = keccak256(abi.encodePacked(productId));
        bytes32 newProductId = bytes32(hash);
        purchases[currentProductId] = Purchase({
            uniqueid: block.timestamp, 
            from: from,
            to: to,
            date: date,
            price: price,
            productId: productId,
            newProductId: newProductId
        });

        emit PurchaseMade(productId, newProductId, purchases[currentProductId].uniqueid, from, to, date, price);
        return (purchases[currentProductId].productId, purchases[currentProductId].newProductId);
    }
    
    function getAllPurchaseIds() public  returns (bytes32[] memory, bytes32[] memory) {
        bytes32[] memory productIdList = new bytes32[](currentProductId);
        bytes32[] memory newProductIdList = new bytes32[](currentProductId);
        
        for (uint i = 1; i <= currentProductId; i++) {
            Purchase storage purchase = purchases[i];
            productIdList[i-1] = purchase.productId;
            newProductIdList[i-1] = purchase.newProductId;
        }
        
        emit PurchaseIdsListed(productIdList, newProductIdList);
        return (productIdList, newProductIdList);
    }
}
