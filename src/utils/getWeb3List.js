import Web3 from 'web3';

export const web3Default = {
  //BSC Mainnet
  56: {
    web3Default: new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')),
    name: 'BSC Mainnet',
    explorer: 'https://bscscan.com/tx/',
  },
  //BSC Testnet
  97: {
    web3Default: new Web3(
      new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s3.binance.org:8545/')
    ),
    name: 'BSC Testnet',
    explorer: 'https://testnet.bscscan.com/tx/',
  },
  4: {
    web3Default: new Web3(
      new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/bd65aacb68614592bb014d78c92a9786'
      )
    ),
    name: 'Rinkeby Testnet',
    explorer: 'https://rinkeby.etherscan.io',
  },
  1: {
    web3Default: new Web3(
      new Web3.providers.HttpProvider(
        'https://mainnet.infura.io/v3/bd65aacb68614592bb014d78c92a9786'
      )
    ),
    name: 'Ethereum Mainnet',
    explorer: 'https://etherscan.io',
  },
  137: {
    web3Default: new Web3(new Web3.providers.HttpProvider('https://rpc-mainnet.maticvigil.com')),
    name: 'Ethereum Mainnet',
    explorer: 'https://polygonscan.com/',
  },
};

export const listInjectNetwork = {
  1: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com'],
  },
  4: {
    chainId: '0x4',
    chainName: 'Rinkeby',
    nativeCurrency: {
      name: 'Rinkeby',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
  56: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  97: {
    chainId: '0x61',
    chainName: 'BSC-Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
};

// export const networkDefault = 56;
export const networkDefault = !!localStorage.getItem('chainId')
  ? parseInt(localStorage.getItem('chainId'))
  : 56;

export const getWeb3List = (_chainId) => {
  return web3Default[_chainId];
};
export const getInjectNetwork = (_chainId) => {
  return listInjectNetwork[_chainId];
};
