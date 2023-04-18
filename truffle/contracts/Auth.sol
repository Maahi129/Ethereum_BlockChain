// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <=0.8.19;

contract Auth {
  struct User {
    bytes32 hashedPassword;
    bytes32 hashedPrivateNumber;
  }
  uint userCount;
  mapping(string => User) private users;

  event UserRegistered(string username);

  function register(string memory username, bytes32 hashedPassword, bytes32 hashedPrivateNumber) public {
     if (bytes(username).length == 0) {
        revert("Username cannot be empty");
    }

    if (users[username].hashedPassword != 0) {
        revert("User already exists");
    }
    users[username] = User(hashedPassword, hashedPrivateNumber);
    userCount++;
    emit UserRegistered(username);
  }

  function login(string memory username, bytes32 hashedPassword, bytes32 hashedPrivateNumber) public view returns (bool) {
    User storage user = users[username];

    if (user.hashedPassword == hashedPassword && user.hashedPrivateNumber == hashedPrivateNumber) {
      return true;
    } else {
      return false;
    }
  }
}
