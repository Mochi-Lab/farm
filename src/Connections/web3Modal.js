import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { setChainId, setWeb3, setAddress, logout } from 'store/actions';
import store from 'store/index';
import { getWeb3List } from 'utils/getWeb3List';
import { numberToHex } from 'web3-utils';

const rpcSupport = {
  1: 'https://mainnet.infura.io/v3/bd65aacb68614592bb014d78c92a9786',
  4: 'https://rinkeby.infura.io/v3/bd65aacb68614592bb014d78c92a9786',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  56: 'https://bsc-dataseed.binance.org/',
  137: 'https://rpc-mainnet.maticvigil.com',
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: rpcSupport,
      qrcodeModalOptions: {
        mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar'],
      },
      bridge: 'https://bridge.walletconnect.org',
    },
  },
};

const paramsSwitchNetwork = {
  56: [
    {
      chainId: '0x38',
      chainName: 'BSC - Mainnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com/'],
    },
  ],
  97: [
    {
      chainId: '0x61',
      chainName: 'BSC - Testnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      blockExplorerUrls: ['https://testnet.bscscan.com/'],
    },
  ],
  137: [
    {
      chainId: '0x89',
      chainName: 'Polygon',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
  ],
};

export const selectChain = async (chainId, walletAddress, isETH) => {
  if (!!rpcSupport[chainId]) {
    if (!!walletAddress) {
      isETH ? injectNetworkEthereum(chainId) : injectNetworkNoEthereum(chainId);
    } else {
      await store.dispatch(setWeb3(getWeb3List(chainId).web3Default));
    }
    await store.dispatch(setChainId(chainId));
  } else {
    alert('Farming does not support this network');
  }
};

// Switch for chains is not ETH
export const injectNetworkNoEthereum = async (chainId) => {
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: paramsSwitchNetwork[chainId],
  });
};

// Switch for chains in ecosystems of Ethereum
export const injectNetworkEthereum = async (chainId) => {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: numberToHex(chainId),
      },
    ],
  });
};

export const connectWeb3Modal = async () => {
  const { chainId } = store.getState();

  if (!!paramsSwitchNetwork[chainId]) {
    injectNetworkNoEthereum(chainId);
  } else {
    injectNetworkEthereum(chainId);
  }

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);

  let chainID = await web3.eth.net.getId();

  if (!!rpcSupport[chainID]) {
    let accounts = await web3.eth.getAccounts();

    store.dispatch(setChainId(chainID));
    store.dispatch(setWeb3(web3));

    if (accounts.length > 0) {
      store.dispatch(setAddress(accounts[0]));
    }
  } else {
    alert('Farming does not support this network');
  }

  // Subscribe to accounts change
  provider.on('accountsChanged', async (accounts) => {
    store.dispatch(setAddress(accounts[0]));
  });

  // Subscribe to chainID change
  provider.on('chainChanged', async (chainID) => {
    chainID = parseInt(web3.utils.hexToNumber(chainID));
    if (!!rpcSupport[chainID]) {
      store.dispatch(setChainId(chainID));
      store.dispatch(setWeb3(web3));
    } else {
      alert('Farming does not support this network');
      await store.dispatch(logout());
    }
  });

  // Subscribe to provider connection
  provider.on('connect', (info) => {
    console.log(info);
  });

  // Subscribe to provider disconnection
  provider.on('disconnect', (error) => {
    console.log(error);
    store.dispatch(setAddress(null));
  });
};
