const contractAddress = {
  //BSC Mainnet
  56: {
    AddressesProvider: '0xc6732Eb8A138052D9e3DFEB66cB0175C94f7e970',
    NftList: '0xC8224F5511fae865793B4235b1aA02011637e742',
    Vault: '0xDa5F1f8d32C094a6c0fc21319bA2E5a64265C429',
    SellOrderList: '0x4786999b7Ebb24876B2bD4705ecc89ECeebDa559',
    Market: '0xc6A8101003d7d2ce14BD344e3df23E4AAfd77899',
    CreativeStudio: '0xa5dD241c1A9A9826fB8E78c7db4dc8fdD3043b66',
    ExchangeOrderList: '0x37ca1D6c7479F3Eb9d6d10309e6f0C611E6bE48F',
    Mochi: '0x3bF0FD7176204A80021C1BD17807144714E31148',
    NFTCampaign: '0x823437B58dB6390AE6F9bCee696788F854618c40',
  },
  //BSC Testnet
  97: {
    AddressesProvider: '0x78de5478Eb3649C6894ce545A11c84e56077c26f',
    CreativeStudio: '0xc42e002888d55002982F9a902b3d1517f528FB4B',
    ExchangeOrderList: '0x371Ac863d7af19dE85a521d10aB5eAa90718D261',
    Market: '0x2184994315dF10eeBD938CfaE7289eD30C8bAdE8',
    NftList: '0xE203287a41B56845652e6607A947e913ADd01E69',
    SellOrderList: '0x7E6A22965E26E9A5C9CEd3FDb7df8B7325848802',
    Vault: '0x2361A85d39686A27689051624e7Dd5a0DF1A0693',
    SeedifyNFT: '0xfA66C3001E0B3f9c6c203f5bBE483D121B28Ae6D',
    NFTCampaign: '0x23442A5094aC64f1B54D07a199e79738f56bdbfE',
    Mochi: '0x254d7BEc0dc2644B58Ddb4f04Bd6C0144ea32E19',
  },
  4: {},
  1: {},
};

const listTokensFarm = {
  4: [
    {
      namePair: 'MOMA-ETH',
      addressLP: '0x96CDd5E2a888ebb97200a81D3710fdc1711cbB77',
      moma: '0xFF02166F7ef6F03b18fB7c6e23d30430202Ef9A2',
      viewContractPair: '0x96CDd5E2a888ebb97200a81D3710fdc1711cbB77',
      contractFarm: '0x5dDe01967C5D0483C81c4336DabEBC50BBEeF5e7',
      contractVesting: '0xcb2690a7DE1f6AC9C05aD910c2b3d1Ca429250AB',
      token0: 'ETH', // it can be an address or a symbol
      symbolEarn: 'MOMA',
      allowanceFarm: 0,
      pendingReward: 0,
      amountStake: 0,
      balanceLP: 0,
      claimableAmount: 0,
      amountLocking: 0,
      apr: 0,
    },
  ],
};

const rootUrlsView = {
  1: {
    addLP: 'https://app.uniswap.org/#/add/',
    viewContract: 'https://etherscan.io/address/',
    seePairInfo: 'https://info.uniswap.org/pair/',
  },
  4: {
    addLP: 'https://app.uniswap.org/#/add/',
    viewContract: 'https://rinkeby.etherscan.io/address/',
    seePairInfo: 'https://info.uniswap.org/pair/',
  },
  56: {
    addLP: 'https://exchange.pancakeswap.finance/#/add/',
    viewContract: 'https://bscscan.com/address/',
    seePairInfo: 'https://pancakeswap.info/pair/',
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
export const getListTokensFarm = (_chainId) => {
  return listTokensFarm[_chainId];
};
export const getRootUrlView = (_chainId) => {
  return rootUrlsView[_chainId];
};
