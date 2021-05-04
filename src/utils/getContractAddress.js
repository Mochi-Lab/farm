const contractAddress = {
  //BSC Mainnet
  56: {
    USDT: { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT', decimals: '18' },
    NATIVE: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      symbol: 'WBNB',
      decimals: '18',
    }, // WBNB
  },
  //BSC Testnet
  97: {},
  4: {},
  1: {
    USDT: { address: '0xdac17f958d2ee523a2206206994597c13d831ec7', symbol: 'USDT', decimals: 6 },
    NATIVE: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', symbol: 'WETH', decimals: 18 }, // WETH
    PairUsdtNative: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852', // pair USDT-WETH
  },
};

const listTokensFarm = {
  1: [
    {
      namePair: 'MOMA-ETH',
      addressLP: '0x611ABC072ee91c0cc19FFEf97ac7E69A1A7A17eC',
      moma: '0xbd1848e1491d4308Ad18287A745DD4DB2A4BD55B',
      contractFarm: '0x8d05f3bef44f3b4cd83427c83c2a4021a5e120d2',
      contractVesting: '0xECDa3345f3018f1f911a53Fa42A96802ba7A463f',
      token0: 'ETH', // it can be an address or a symbol
      symbolEarn: 'MOMA',
      decimalsMoma: 18,
      allowanceFarm: 0,
      pendingReward: 0,
      amountStake: 0,
      balanceLP: 0,
      claimableAmount: 0,
      amountLocking: 0,
      apr: 0,
    },
  ],
  4: [
    {
      namePair: 'MOMA-ETH',
      addressLP: '0x96CDd5E2a888ebb97200a81D3710fdc1711cbB77',
      moma: '0xFF02166F7ef6F03b18fB7c6e23d30430202Ef9A2',
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
