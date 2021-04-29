import { Menu, Grid } from 'antd';
import ConnectWallet from 'Components/ConnectWallet';
import ToggleDarkMode from 'Components/ToggleDarkMode';

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const screen = useBreakpoint();

  return (
    <Menu mode={screen.md && screen.lg ? 'horizontal' : 'inline'}>
      <Menu.Item key='connect-wallet'>
        <ConnectWallet />
      </Menu.Item>
      <Menu.Item key='dark-mode'>
        <ToggleDarkMode />
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
