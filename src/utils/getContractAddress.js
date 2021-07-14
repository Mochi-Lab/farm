import bnb from 'Assets/icons/binance-smart-chain-icon.png';
import polygon from 'Assets/icons/polygon-icon.png';
import eth from 'Assets/icons/ethereum-icon.png';

import Artboard1 from 'Assets/icons/Artboard1.png';
import Artboard2 from 'Assets/icons/Artboard2.png';
import Artboard3 from 'Assets/icons/Artboard3.png';
import Artboard4 from 'Assets/icons/Artboard4.png';

const contractAddress = {
  //BSC Mainnet
  56: {
    USDT: { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD', decimals: '18' },
    NATIVE: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      symbol: 'WBNB',
      decimals: '18',
    }, // WBNB
    PairUsdtNative: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', // pair USDT-WBNB
  },
  //BSC Testnet
  97: {
    USDT: { address: '0x82a75255DCFDA994FE89A1023F7CD1c6C7D19740', symbol: 'BUSD', decimals: '18' },
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
  137: {
    USDT: { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', symbol: 'USDT', decimals: 6 },
    NATIVE: { address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', symbol: 'WETH', decimals: 18 }, // WMATIC
    PairUsdtNative: '0x604229c960e5CACF2aaEAc8Be68Ac07BA9dF81c3', // pair USDT-WMATIC
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
      autoRestake: false,
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
      autoRestake: false,
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
      autoRestake: false,
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
      autoRestake: false,
    },
  ],
  56: [
    {
      icon: Artboard1,
      namePair: 'MOMA-BNB',
      addressLP: '0x94e47b2c97781d506E00775787c815481A307F21',
      moma: '0xB72842D6F5feDf91D22d56202802Bb9A79C6322E',
      contractFarm: '0x01A2cE7925dc8E07F23a3Fd5677040811809066b',
      contractVesting: '0xC4a3829ECDbE8EEc07052D9631a6B52ea5deA60E',
      token0: 'BNB', // it can be an address0x94e47b2c97781d506E00775787c815481A307F21 or a symbol
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
      yearlyMomaReward: 1835827,
      multiplier: 0.2,
      autoRestake: true,
    },
    {
      icon: Artboard2,
      namePair: 'MOMA-BNB',
      addressLP: '0x94e47b2c97781d506E00775787c815481A307F21',
      moma: '0xB72842D6F5feDf91D22d56202802Bb9A79C6322E',
      contractFarm: '0x939351f1274F3b6af210fbbbc839e45D274A0B8C',
      contractVesting: '0x4Bd704172f500e96d15b4f388113529dEE81049c',
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
      yearlyMomaReward: 917913,
      multiplier: 0.1,
      autoRestake: false,
    },
    {
      icon: Artboard3,
      namePair: 'MOMA-BNB',
      addressLP: '0x94e47b2c97781d506E00775787c815481A307F21',
      moma: '0xB72842D6F5feDf91D22d56202802Bb9A79C6322E',
      contractFarm: '0x4eaDA50Ce6f570393967314d8550a0Ec5BC54c80',
      contractVesting: '0x0000000000000000000000000000000000000000',
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
      yearlyMomaReward: 458957,
      multiplier: 0.05,
      autoRestake: false,
    },
  ],
  97: [
    {
      icon: Artboard3,
      namePair: 'MOMA-BNB',
      addressLP: '0x8d0d1889cf21dc3ee413c4337a862770f201b982',
      moma: '0x7e037659F51EF31D8da997481946d833D7535730',
      contractFarm: '0x03f5cB25f05D906e52EB7E944Ed9cabe00d57FCd',
      contractVesting: '0x0000000000000000000000000000000000000000',
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
      yearlyMomaReward: 458957,
      multiplier: 0.05,
      autoRestake: false,
    },
    {
      icon: Artboard1,
      namePair: 'MOMA-BNB',
      addressLP: '0x8d0d1889cf21dc3ee413c4337a862770f201b982',
      moma: '0x7e037659F51EF31D8da997481946d833D7535730',
      contractFarm: '0x81906766f073Cb6ca34B5D665F7354b860402A84',
      contractVesting: '0x71e815aC8271a098EFa53FA5B6beC56Fe66A836e',
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
      yearlyMomaReward: 1835827,
      multiplier: 0.2,
      autoRestake: false,
    },
    {
      icon: Artboard2,
      namePair: 'MOMA-BNB',
      addressLP: '0x8d0d1889cf21dc3ee413c4337a862770f201b982',
      moma: '0x7e037659F51EF31D8da997481946d833D7535730',
      contractFarm: '0xFdCBfb1067096BB34e9508E14D98470463839c69',
      contractVesting: '0x1C44Ad758f1FAb3Da74Ce9eBFC62971891d0437f',
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
      yearlyMomaReward: 917913,
      multiplier: 0.1,
      autoRestake: false,
    },
  ],
};

const listTokensPoolDefault = {
  1: [],
  4: [],
  56: [
    {
      icon: Artboard4,
      namePair: 'MOMA',
      addressLP: '0xB72842D6F5feDf91D22d56202802Bb9A79C6322E',
      pairTokenAndNative: '0x94e47b2c97781d506E00775787c815481A307F21',
      contractPool: '0xf84718a7B515124009A5B53F0e8c763935FeEb82',
      token0: 'BNB', // it can be an address or a symbol
      symbolEarn: 'MOMA',
      decimalsLP: 18,
      allowanceFarm: 0,
      pendingReward: 0,
      amountStake: 0,
      balanceLP: 0,
      vestingDuration: 0,
      apr: 0,
      yearlyMomaReward: 367165,
      multiplier: 0.04,
      autoRestake: false,
      statusCompound: true,
    },
  ],
  97: [
    {
      icon: Artboard4,
      namePair: 'MOMA',
      addressLP: '0x7e037659F51EF31D8da997481946d833D7535730',
      pairTokenAndNative: '0x8d0d1889cf21dc3ee413c4337a862770f201b982',
      contractPool: '0xd516266e93e61f45e3209423a81d784b801EAc17',
      token0: 'BNB', // it can be an address or a symbol
      symbolEarn: 'MOMA',
      decimalsLP: 18,
      allowanceFarm: 0,
      pendingReward: 0,
      amountStake: 0,
      balanceLP: 0,
      vestingDuration: 0,
      apr: 0,
      yearlyMomaReward: 332605,
      multiplier: 0.04,
      autoRestake: false,
      statusCompound: true,
    },
  ],
};

const rootUrlsView = {
  1: {
    addLP: 'https://app.uniswap.org/#/add/v2/',
    viewContract: 'https://etherscan.io/address/',
    seePairInfo: 'https://v2.info.uniswap.org/pair/',
    blocksPerMonth: 195000,
    swap: 'https://app.uniswap.org/#/swap?outputCurrency=',
  },
  4: {
    addLP: 'https://app.uniswap.org/#/add/v2/',
    viewContract: 'https://rinkeby.etherscan.io/address/',
    seePairInfo: 'https://v2.info.uniswap.org/pair/',
    blocksPerMonth: 195000,
    swap: 'https://app.uniswap.org/#/swap?outputCurrency=',
  },
  56: {
    addLP: 'https://exchange.pancakeswap.finance/#/add/',
    viewContract: 'https://bscscan.com/address/',
    seePairInfo: 'https://pancakeswap.info/pair/',
    blocksPerMonth: 864000,
    swap: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=',
  },
  97: {
    addLP: 'https://exchange.pancakeswap.finance/#/add/',
    viewContract: 'https://bscscan.com/address/',
    seePairInfo: 'https://pancakeswap.info/pair/',
    blocksPerMonth: 864000,
    swap: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=',
  },
  137: {
    addLP: 'https://quickswap.exchange/#/add',
    viewContract: 'https://polygonscan.com/address/',
    seePairInfo: 'https://info.quickswap.exchange/pair/',
    blocksPerMonth: 864000,
    swap: 'https://quickswap.exchange/#/swap?inputCurrency=',
  },
};

export const listChainsSupport = [
  { chainId: 1, name: 'Ethereum', icon: eth, isETH: true /* Ethereum Mainnet*/ },
  { chainId: 56, name: 'BSC', icon: bnb, isETH: false /*BSC Mainnet*/ },
  { chainId: 137, name: 'Polygon', icon: polygon, isETH: false /* Polygon Mainnet*/ },
  // { chainId: 1666600000, name: 'Harmony', icon: one, isETH: false /*BSC Testnet*/ },
];

const infoChains = {
  //Ethereum Mainnet
  1: { name: 'Ethereum', icon: eth },
  //Ethereum Testnet Rinkeby
  4: { name: 'Rinkeby', icon: eth },
  //Polygon Mainnet
  137: { name: 'Polygon', icon: polygon },
  //BSC Mainnet
  56: { name: 'BSC', icon: bnb },
  //BSC Testnet
  97: { name: 'BSC-Testnet', icon: bnb },
  // Harmony mainet
  // 1666600000: { name: 'Harmony', icon: one },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
export const getListTokensFarmDefault = (_chainId) => {
  return listTokensFarmDefault[_chainId];
};
export const getListTokensPoolDefault = (_chainId) => {
  return listTokensPoolDefault[_chainId];
};
export const getRootUrlView = (_chainId) => {
  return rootUrlsView[_chainId];
};
export const getInfoChain = (_chainId) => {
  return infoChains[_chainId];
};
