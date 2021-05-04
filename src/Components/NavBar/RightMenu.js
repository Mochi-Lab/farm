import ConnectWallet from 'Components/ConnectWallet';
import ToggleDarkMode from 'Components/ToggleDarkMode';

const RightMenu = () => {
  return (
    <div className='connect-and-dark-mode'>
      <div className='style-connect'>
        <ConnectWallet />
      </div>
      <div className='style-dark-mode'>
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default RightMenu;
