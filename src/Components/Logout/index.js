import { Button, Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import { logout } from 'store/actions';
import { useState } from 'react';
import './index.css';

export default function LogoutWallet() {
  const { shortAddress, walletAddress } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const logoutAction = () => {
    dispatch(logout());
    cancelModal();
  };

  async function cancelModal() {
    setIsModalVisible(false);
  }

  return (
    <div className='logoutModal'>
      <Button className='pink-font bt-cnlo' shape='round' onClick={() => setIsModalVisible(true)}>
        <Badge status='success' />
        {shortAddress}
      </Button>

      <Modal
        centered
        visible={isModalVisible}
        title={[
          <h2 key='title' className='textmode mgb-0'>
            Your wallet
          </h2>,
        ]}
        onOk={() => cancelModal}
        onCancel={() => cancelModal()}
        footer={[
          <div key='cancel' style={{ width: '100%' }} className='center'>
            <Button
              className='ant-btn ant-btn-primary btn-logout'
              onClick={() => logoutAction()}
              size='large'
              shape='round'
            >
              Logout
            </Button>
          </div>,
        ]}
      >
        <div key='content'>
          <div className='textmode wl-fs'>{walletAddress}</div>
        </div>
      </Modal>
    </div>
  );
}
