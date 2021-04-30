import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { setChainId, setWeb3, setAddress } from 'store/actions';
import store from 'store/index';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        // 56: 'https://bsc-dataseed.binance.org/',
        // 97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        1: 'https://mainnet.infura.io/v3/bd65aacb68614592bb014d78c92a9786',
        4: 'https://rinkeby.infura.io/v3/bd65aacb68614592bb014d78c92a9786',
      },
      qrcodeModalOptions: {
        mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar'],
      },
      bridge: 'https://bridge.walletconnect.org',
    },
  },
};

export const connectWeb3Modal = async () => {
  const web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    network: 'mainnet',
    providerOptions, // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);

  let chainId = await web3.eth.net.getId();

  if (chainId === 1 || chainId === 4) {
    let accounts = await web3.eth.getAccounts();

    store.dispatch(setChainId(chainId));
    store.dispatch(setWeb3(web3));

    if (accounts.length > 0) {
      store.dispatch(setAddress(accounts[0]));
    }
  }

  // Subscribe to accounts change
  provider.on('accountsChanged', (accounts) => {
    store.dispatch(setAddress(accounts[0]));
  });

  // Subscribe to chainId change
  provider.on('chainChanged', (chainId) => {
    chainId = parseInt(web3.utils.hexToNumber(chainId));
    if (chainId === 1 || chainId === 4) {
      store.dispatch(setChainId(chainId));
      store.dispatch(setWeb3(web3));
    } else {
      alert('Farming does not support this network');
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
