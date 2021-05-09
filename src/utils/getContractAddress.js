import Artboard1 from 'Assets/icons/Artboard1.png';
import Artboard2 from 'Assets/icons/Artboard2.png';
import Artboard3 from 'Assets/icons/Artboard3.png';

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
  97: {
    USDT: { address: '0x82a75255DCFDA994FE89A1023F7CD1c6C7D19740', symbol: 'USDT', decimals: '18' },
    NATIVE: {
      address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      symbol: 'WBNB',
      decimals: '18',
    }, // WBNB
    PairUsdtNative: '0xd57c0c65a8e7b7Fb0a81B9b2ba70Ce11372599d0', // pair USDT-WBNB
  },
  4: {
    USDT: { address: '0x24F90eC26AfFacc9CacC34829D350078f79a8A6a', symbol: 'USDT', decimals: '18' },
    NATIVE: {
      address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      symbol: 'WETH',
      decimals: '18',
    }, // WETH
    PairUsdtNative: '0xA7AA6f2D58D7009205a916C52CfedF0edD56749a', // pair USDT-WETH
  },
  1: {
    USDT: { address: '0xdac17f958d2ee523a2206206994597c13d831ec7', symbol: 'USDT', decimals: 6 },
    NATIVE: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', symbol: 'WETH', decimals: 18 }, // WETH
    PairUsdtNative: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852', // pair USDT-WETH
  },
};

const listTokensFarmDefault = {
  1: [
    {
      icon: Artboard1,
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
      vestingDuration: 0,
      apr: 0,
      yearlyMomaReward: 6215038,
      multiplier: 3,
    },
  ],
  4: [
    {
      icon: Artboard1,
      namePair: 'MOMA-ETH',
      addressLP: '0x1e9349147CF5063AD878dB1a7F4Fd65A36c315d5',
      moma: '0x834C5d20093BF538051aE3Aa04d6bC548110e54C',
      contractFarm: '0x8Ba3a8857387342D2D26cCFC1488DE8E2289D701',
      contractVesting: '0x056e751862E1a7Ab3F765F5d7909a9215fB8f802',
      token0: 'ETH', // it can be an address or a symbol
      symbolEarn: 'MOMA',
      decimalsMoma: 18,
      allowanceFarm: 0,
      pendingReward: 0,
      amountStake: 0,
      balanceLP: 0,
      claimableAmount: 0,
      amountLocking: 0,
      vestingDuration: 0,
      apr: 0,
      yearlyMomaReward: 6215038,
      multiplier: 3,
    },
    {
      icon: Artboard2,
      namePair: 'MOMA-ETH',
      addressLP: '0x1e9349147CF5063AD878dB1a7F4Fd65A36c315d5',
      moma: '0x834C5d20093BF538051aE3Aa04d6bC548110e54C',
      contractFarm: '0xcf80a2321c6c7ab945a635e41cf0b47884b0a5d6',
      contractVesting: '0xDff77aB3a9414f45588B5B3a1abC5cffFeC8CA17',
      token0: 'ETH', // it can be an address or a symbol
      symbolEarn: 'MOMA',
      decimalsMoma: 18,
      allowanceFarm: 0,
      pendingReward: 0,
      amountStake: 0,
      balanceLP: 0,
      claimableAmount: 0,
      amountLocking: 0,
      vestingDuration: 0,
      apr: 0,
      yearlyMomaReward: 3456139,
      multiplier: 2,
    },
    {
      icon: Artboard3,
      namePair: 'MOMA-ETH',
      addressLP: '0x1e9349147CF5063AD878dB1a7F4Fd65A36c315d5',
      moma: '0x834C5d20093BF538051aE3Aa04d6bC548110e54C',
      contractFarm: '0x4fd4d60388b6f6de7291cc595d52bfd715905d46',
      contractVesting: '0x0000000000000000000000000000000000000000',
      token0: 'ETH', // it can be an address or a symbol
      symbolEarn: 'MOMA',
      decimalsMoma: 18,
      allowanceFarm: 0,
      pendingReward: 0,
      amountStake: 0,
      balanceLP: 0,
      claimableAmount: 0,
      amountLocking: 0,
      vestingDuration: 0,
      apr: 0,
      yearlyMomaReward: 1728069,
      multiplier: 1,
    },
  ],
  97: [
    {
      icon: Artboard1,
      namePair: 'MOMA-BNB',
      addressLP: '0x715Fb3e6e62f6D6865369F4CF9DcdbCbf06E909f',
      moma: '0x0db74DdEc6e780BFdf92f34Ad4c66cEdBd045bea',
      contractFarm: '0x9f3b947afeB3466E034E98053F3555C54e24d453',
      contractVesting: '0xE4D5BB1A7cb41FfA1Ec81382118DB9ED8a64E8b5',
      token0: 'BNB', // it can be an address or a symbol
      symbolEarn: 'MOMA',
      decimalsMoma: 18,
      allowanceFarm: 0,
      pendingReward: 0,
      amountStake: 0,
      balanceLP: 0,
      claimableAmount: 0,
      amountLocking: 0,
      vestingDuration: 0,
      apr: 0,
      yearlyMomaReward: 6215038,
      multiplier: 3,
    },
  ],
};

const rootUrlsView = {
  1: {
    addLP: 'https://app.uniswap.org/#/add/v2/',
    viewContract: 'https://etherscan.io/address/',
    seePairInfo: 'https://v2.info.uniswap.org/pair/',
  },
  4: {
    addLP: 'https://app.uniswap.org/#/add/v2/',
    viewContract: 'https://rinkeby.etherscan.io/address/',
    seePairInfo: 'https://v2.info.uniswap.org/pair/',
  },
  56: {
    addLP: 'https://exchange.pancakeswap.finance/#/add/',
    viewContract: 'https://bscscan.com/address/',
    seePairInfo: 'https://pancakeswap.info/pair/',
  },
  97: {
    addLP: 'https://exchange.pancakeswap.finance/#/add/',
    viewContract: 'https://bscscan.com/address/',
    seePairInfo: 'https://pancakeswap.info/pair/',
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
export const getListTokensFarmDefault = (_chainId) => {
  return listTokensFarmDefault[_chainId];
};
export const getRootUrlView = (_chainId) => {
  return rootUrlsView[_chainId];
};
