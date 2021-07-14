import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Link } from 'react-router-dom';
import logoMochi from 'Assets/logo-mochi.png';

export default function NavBar() {
  return (
    <nav className='menu-bar alignItem'>
      <div className='left-menu'>
        <div className='logo'>
          <Link to='/'>
            <img src={logoMochi} alt='logo'></img>
          </Link>
        </div>
        <div className='info-chain'>
          <LeftMenu />
        </div>
      </div>
      <div className='rightMenu'>
        <RightMenu />
      </div>
    </nav>
  );
}
