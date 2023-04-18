const UserSold = artifacts.require("UserSold");

module.exports = function (deployer) {
  deployer.deploy(UserSold);
};
