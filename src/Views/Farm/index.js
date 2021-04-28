import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import CardFarm from './CardFarm';
// import CountDownTime from 'Components/CountDownTime';
import { getListTokensFarm, getRootUrlView } from 'utils/getContractAddress';
import useInterval from 'utils/useInterval';
import {
  checkAllowanceFarm,
  setListTokensFarm,
  fetchPendingReward,
  fetchAmountStake,
  fetchBalanceLP,
  fetchVestingTotalClaimableAmount,
  fetchTotalAmountLockedByUser,
} from 'store/actions';
import store from 'store/index';
import './index.css';

export default function Farm() {
  const { walletAddress, chainId, listTokensFarm } = useSelector((state) => state);
  const [rootUrlsView, setRootUrlsView] = useState(getRootUrlView(chainId));

  useEffect(() => {
    const fetchListFarmDefault = async () => {
      await store.dispatch(setListTokensFarm(getListTokensFarm(chainId)));
      setRootUrlsView(getRootUrlView(chainId));
    };

    if (!!chainId) {
      fetchListFarmDefault();
    }
  }, [chainId]);

  const fetchAllFarm = async () => {
    if (!!walletAddress && !!listTokensFarm) {
      var listToken = listTokensFarm;
      listToken.forEach(async (pool, i) => {
        listToken[i].pendingReward = await store.dispatch(fetchPendingReward(pool.contractFarm));
        listToken[i].allowanceFarm = await store.dispatch(
          checkAllowanceFarm(pool.addressLP, pool.contractFarm)
        );
        listToken[i].amountStake = await store.dispatch(fetchAmountStake(pool.contractFarm));
        listToken[i].balanceLP = await store.dispatch(fetchBalanceLP(pool.addressLP));
        listToken[i].claimableAmount = await store.dispatch(
          fetchVestingTotalClaimableAmount(pool.contractVesting)
        );
        listToken[i].amountLocking = await store.dispatch(
          fetchTotalAmountLockedByUser(pool.contractVesting)
        );
      });
      await store.dispatch(setListTokensFarm(listToken));
    }
  };

  useEffect(() => {
    const fetchAllFarmEseEffect = async () => {
      if (!!walletAddress && !!listTokensFarm) {
        var listToken = listTokensFarm;
        listToken.forEach(async (pool, i) => {
          listToken[i].pendingReward = await store.dispatch(fetchPendingReward(pool.contractFarm));
          listToken[i].allowanceFarm = await store.dispatch(
            checkAllowanceFarm(pool.addressLP, pool.contractFarm)
          );
          listToken[i].amountStake = await store.dispatch(fetchAmountStake(pool.contractFarm));
          listToken[i].balanceLP = await store.dispatch(fetchBalanceLP(pool.addressLP));
          listToken[i].claimableAmount = await store.dispatch(
            fetchVestingTotalClaimableAmount(pool.contractVesting)
          );
          listToken[i].amountLocking = await store.dispatch(
            fetchTotalAmountLockedByUser(pool.contractVesting)
          );
        });
        await store.dispatch(setListTokensFarm(listToken));
      }
    };

    if (!!walletAddress) {
      fetchAllFarmEseEffect();
    }
  }, [walletAddress, chainId, listTokensFarm]);

  useInterval(() => {
    fetchAllFarm();
  }, 5000);

  return (
    <div className='staking-view'>
      <div className='container'>
        {/* <CountDownTime className='countdown-stake' /> */}
        <div className='list-staking'>
          <Row justify='center'>
            {!!listTokensFarm
              ? listTokensFarm.map((token, index) => (
                  <CardFarm
                    setListTokensFarm={setListTokensFarm}
                    token={token}
                    key={index}
                    index={index}
                    walletAddress={walletAddress}
                    fetchAllFarm={fetchAllFarm}
                    rootUrlsView={rootUrlsView}
                  />
                ))
              : null}
          </Row>
        </div>
      </div>
    </div>
  );
}
