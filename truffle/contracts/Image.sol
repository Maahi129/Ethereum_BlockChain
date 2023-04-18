// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Image {
    string private _value1;
    string private _value2;
    string private _value3;
    string private _value4;

    function setValue(string memory value1, string memory value2, string memory value3, string memory value4) public {
        _value1 = value1;
        _value2 = value2;
         _value3 = value3;
         _value4 = value4;
    }

    function getValue1() public view returns (string memory) {
        return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/", _value1));
    }
    function getValue2() public view returns (string memory) {
        return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/", _value2));
    }
    function getValue3() public view returns (string memory) {
        return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/", _value3));
    }
    function getValue4() public view returns (string memory) {
        return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/", _value4));
    }
}
