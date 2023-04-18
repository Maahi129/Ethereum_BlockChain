// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SellerContractGoods {
  struct Product {
    string sellerName;
    string purchaserName;
    string date;
    uint price;
    bytes32 friendPurchaseId;
  }

  uint public total;
  
  mapping(bytes32 => Product) public products;
  mapping(bytes32 => bool) public productExists;
  mapping(bytes32 => bool) public blocklist;

  event PurchaseSuccessful(
    bytes32 indexed productId,
    string sellerName,
    string purchaserName,
    string date,
    uint price
  );

  event FriendPurchaseAdded(
    bytes32 indexed productId,
    bytes32 friendPurchaseId
  );

  event ProductBlocked(
    bytes32 indexed productId
  );
  event ProductUnblocked(
  bytes32 indexed productId
);


  function purchase(string memory _sellerName, string memory _purchaserName, string memory _date, uint _price) public returns (bytes32) {
    bytes32 productId = keccak256(abi.encodePacked(_sellerName, _purchaserName, _date, _price, block.timestamp, block.difficulty));
    require(!productExists[productId], "Product ID already exists");
    products[productId] = Product(_sellerName, _purchaserName, _date, _price, bytes32(0));
    productExists[productId] = true;
    total++;

    emit PurchaseSuccessful(productId, _sellerName, _purchaserName, _date, _price);

    return productId;
  }

  function verify(bytes32 _productId) public view returns (bool) {
    return productExists[_productId];
  }

  function getProduct(bytes32 _productId) public view returns (string memory sellerName, string memory purchaserName, string memory date, uint price, bytes32 friendPurchaseId) {
    require(productExists[_productId], "Product ID does not exist");
    Product memory product = products[_productId];
    sellerName = product.sellerName;
    purchaserName = product.purchaserName;
    date = product.date;
    price = product.price;
    friendPurchaseId = product.friendPurchaseId;
  }

  function addFriendPurchase(bytes32 _productId, bytes32 _friendPurchaseId) public {
    require(productExists[_productId], "Product ID does not exist");
    products[_productId].friendPurchaseId = _friendPurchaseId;
    productExists[_friendPurchaseId] = true;
    emit FriendPurchaseAdded(_productId, _friendPurchaseId);
  }

  function blockProduct(bytes32 _productId) public {
    require(productExists[_productId], "Product ID does not exist");
    blocklist[_productId] = true;
    emit ProductBlocked(_productId);
  }

  function unblockProduct(bytes32 _productId) public {
  require(productExists[_productId], "Product ID does not exist");
  blocklist[_productId] = false;
  emit ProductUnblocked(_productId);
}


  function counter() public view returns (uint) {
    return total;
  }
}
