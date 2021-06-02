import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputNumber } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { parseBalance, parseBalanceNoToFixed } from 'utils/helper';
import { depositFarm, withdrawFarm } from 'store/actions';
import store from 'store/index';
import './index.css';

export default function ActionsFarm({ token, fetchAllFarm, percentInPool }) {
  const { web3 } = useSelector((state) => state);

  const [amountStake, setAmountStake] = useState();
  const [amountUnstake, setAmountUnstake] = useState();
  const [loadingStake, setLoadingStake] = useState(false);
  const [loadingWithdraw, setLoadingWitdraw] = useState(false);

  async function stakeTokenFarm() {
    if (amountStake > 0.0001) {
      setLoadingStake(true);
      await store.dispatch(depositFarm(amountStake, token.contractFarm));
      fetchAllFarm();
      setAmountStake(null);
      setLoadingStake(false);
    }
  }

  async function withdrawTokenFarm() {
    if (amountUnstake > 0.0001) {
      setLoadingWitdraw(true);
      await store.dispatch(withdrawFarm(amountUnstake, token.contractFarm));
      fetchAllFarm();
      setAmountUnstake(null);
      setLoadingWitdraw(false);
    }
  }

  async function handleChangeAmountStake(amount) {
    if (amount > parseBalance(token.balanceLP, 18)) {
      setAmountStake(token.balanceLP);
    } else {
      const amountWei = !!amount ? web3.utils.toWei(amount.toString(), 'ether') : null;
      setAmountStake(amountWei);
    }
  }
  async function handleChangeAmountUnstake(amount) {
    if (amount > parseBalance(token.amountStake, 18)) {
      setAmountUnstake(token.amountStake);
    } else {
      const amountWei = !!amount ? web3.utils.toWei(amount.toString(), 'ether') : null;
      setAmountUnstake(amountWei);
    }
  }

  return (
    <div className='input-stake-withdraw'>
      <div className='balance-lp-and-staked'>
        <div className='balance-lp'>
          <span className='blur-text textmode'>Available: </span>
          <span
            className='textmode balance-lp-amount'
            style={{ cursor: 'pointer' }}
            onClick={() => setAmountStake(token.balanceLP)}
          >
            {parseBalance(token.balanceLP, 18)}
          </span>
        </div>
        <div className='staked-lp'>
          <span className='blur-text textmode'>Staked: </span>
          <span
            className='textmode staked-lp-amount'
            style={{ cursor: 'pointer' }}
            onClick={() => setAmountUnstake(token.amountStake)}
          >
            {parseBalance(token.amountStake, 18)}
          </span>
        </div>
        <div className='staked-lp'>
          <span className='blur-text textmode'>Your pool share: </span>
          <span className='textmode staked-lp-amount'>{percentInPool}%</span>
        </div>
      </div>
      <div className='input-amount'>
        <div className='input-amount-stake'>
          <InputNumber
            bordered={false}
            min={0.0001}
            placeholder='0'
            value={
              !!parseBalanceNoToFixed(amountStake, 18)
                ? parseBalanceNoToFixed(amountStake, 18)
                : null
            }
            onChange={(amount) => handleChangeAmountStake(amount)}
            size='large'
          />
          <div className='btn-max' onClick={() => setAmountStake(token.balanceLP)}>
            max
          </div>
        </div>
        <div className='input-amount-unstake'>
          <InputNumber
            bordered={false}
            min={0.0001}
            placeholder='0'
            value={
              !!parseBalanceNoToFixed(amountUnstake, 18)
                ? parseBalanceNoToFixed(amountUnstake, 18)
                : null
            }
            onChange={(amount) => handleChangeAmountUnstake(amount)}
            size='large'
          />
          <div className='btn-max' onClick={() => setAmountUnstake(token.amountStake)}>
            max
          </div>
        </div>
      </div>
      <div className='actions-farm'>
        <div className='action-stake'>
          <Button
            loading={loadingStake}
            icon={<ArrowUpOutlined />}
            onClick={() => stakeTokenFarm()}
          >
            Stake
          </Button>
        </div>
        <div className='action-witdraw'>
          <Button
            loading={loadingWithdraw}
            icon={<ArrowDownOutlined />}
            onClick={() => withdrawTokenFarm()}
          >
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
}
