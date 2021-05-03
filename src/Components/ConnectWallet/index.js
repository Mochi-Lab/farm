import { Button, Badge } from 'antd';
import { connectWeb3Modal } from 'Connections/web3Modal';
import { useSelector } from 'react-redux';
import LogoutWallet from 'Components/Logout';

export default function ConnectWallet() {
  const { walletAddress } = useSelector((state) => state);

  const connect = () => {
    connectWeb3Modal();
  };

  return !!walletAddress ? (
    <LogoutWallet />
  ) : (
    <Button className='pink-font bt-cnlo' shape='round' onClick={() => connect()}>
      <Badge status='error' />
      Connect Wallet
    </Button>
  );
}
