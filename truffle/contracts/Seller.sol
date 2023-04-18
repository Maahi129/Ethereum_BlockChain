// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Seller {
  address[] whitelist;
  mapping(address => bool) isSeller;

  function addSeller(address _seller) public {
    require(!isSeller[_seller], "Seller is already in whitelist");
    whitelist.push(_seller);
    isSeller[_seller] = true;
  }

  function login(address seller) public view returns (bool) {
    require(isSeller[seller], "Only sellers can login.");
    return true;
  }
}
