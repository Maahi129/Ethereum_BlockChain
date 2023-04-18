const GoodsContract = artifacts.require("GoodsContract");

module.exports = function (deployer) {
  deployer.deploy(GoodsContract);
};
