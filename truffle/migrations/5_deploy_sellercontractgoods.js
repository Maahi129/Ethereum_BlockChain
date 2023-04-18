const SellerContractGoods = artifacts.require("SellerContractGoods");

module.exports = function (deployer) {
  deployer.deploy(SellerContractGoods);
};
