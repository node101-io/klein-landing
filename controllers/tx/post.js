const { SigningCosmosClient } = require("@cosmjs/stargate");

module.exports = async (req, res) => {
  // Import CosmJS after enabling Keplr 
  const accounts = await offlineSigner.getAccounts();

  const cosmJS = new SigningCosmosClient(
    "https://lcd-cosmoshub.keplr.app",
    accounts[0].address,
    offlineSigner
  );
};