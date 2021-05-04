import { useState } from 'react';
import { Modal, Button, InputNumber } from 'antd';
import { parseBalance } from 'utils/helper';
import { depositFarm, withdrawFarm } from 'store/actions';
import store from 'store/index';
import './index.css';

export default function ModalFarm({ showModalFarm, setShowModalFarm, token, fetchAllFarm }) {
  const [amountLP, setAmountLP] = useState();
  const [loading, setLoading] = useState(false);

  async function depositTokenFarm() {
    if (amountLP > 0) {
      setLoading(true);
      await store.dispatch(depositFarm(amountLP, token.contractFarm));
      fetchAllFarm();
      cancelModal();
      setLoading(false);
    }
  }

  async function withdrawTokenFarm() {
    if (amountLP > 0) {
      setLoading(true);
      await store.dispatch(withdrawFarm(amountLP, token.contractFarm));
      fetchAllFarm();
      cancelModal();
      setLoading(false);
    }
  }

  async function cancelModal() {
    setShowModalFarm({ status: false, type: '', symbol: '' });
    setAmountLP(null);
  }

  async function handleChangeAmoun(amount) {
    if (showModalFarm.type === 'stake') {
      if (amount > parseBalance(token.balanceLP, 18)) {
        setAmountLP(parseBalance(token.balanceLP, 18));
      } else {
        setAmountLP(amount);
      }
    }
    if (showModalFarm.type === 'unstake') {
      if (amount > parseBalance(token.amountStake, 18)) {
        setAmountLP(parseBalance(token.amountStake, 18));
      } else {
        setAmountLP(amount);
      }
    }
  }

  return (
    <Modal
      centered
      visible={showModalFarm.status}
      title={[
        <h1 key='title'>
          {showModalFarm.type === 'stake' ? 'Stake LP tokens' : 'Unstake LP tokens'}
        </h1>,
      ]}
      onOk={() => cancelModal}
      onCancel={() => cancelModal()}
      footer={[
        <Button
          key='cancel'
          className='btn-farm'
          onClick={() => cancelModal()}
          size='large'
          shape='round'
        >
          Cancel
        </Button>,
        <Button
          key='confirm'
          className='btn-farm btn-confrim-farm'
          size='large'
          shape='round'
          onClick={() => {
            if (showModalFarm.type === 'stake') {
              depositTokenFarm();
            }
            if (showModalFarm.type === 'unstake') {
              withdrawTokenFarm();
            }
          }}
          loading={loading}
        >
          Confirm
        </Button>,
      ]}
    >
      <div className='modal-farm'>
        <div className='box-input-farm'>
          <div className='left-box-input-farm'>
            <div className='title-input'>
              {showModalFarm.type === 'stake' ? 'Stake' : 'Unstake'}
            </div>
            <div className='input-amount'>
              <InputNumber
                min={0.001}
                placeholder='0'
                bordered={false}
                value={amountLP}
                onChange={(amount) => handleChangeAmoun(amount)}
              />
            </div>
          </div>
          <div className='right-box-input-farm'>
            <div className='title-balanace'>
              Balance:{' '}
              {showModalFarm.type === 'stake'
                ? parseBalance(token.balanceLP, 18)
                : parseBalance(token.amountStake, 18)}
            </div>
            <div className='area-max-lp'>
              <Button
                key='confirm'
                className='btn-amount-max-farm'
                size='large'
                shape='round'
                onClick={() =>
                  setAmountLP(
                    showModalFarm.type === 'stake'
                      ? parseBalance(token.balanceLP, 18)
                      : parseBalance(token.amountStake, 18)
                  )
                }
              >
                Max
              </Button>
              <div className='symbol-pool'>{showModalFarm.symbol} LP</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
