import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import CardFarm from './CardFarm';
import {
  getListTokensFarmDefault,
  getRootUrlView,
  getContractAddress,
} from 'utils/getContractAddress';
import useInterval from 'utils/useInterval';
import {
  checkAllowanceFarm,
  setListTokensFarm,
  fetchPendingReward,
  fetchAmountStake,
  fetchBalanceLP,
  fetchVestingTotalClaimableAmount,
  fetchTotalAmountLockedByUser,
  setContractAddress,
} from 'store/actions';
import store from 'store/index';
import './index.css';

export default function Farm() {
  const { walletAddress, chainId, listTokensFarm, contractAddress } = useSelector((state) => state);
  const [rootUrlsView, setRootUrlsView] = useState(getRootUrlView(chainId));
  const fetchAllFarm = async () => {
    if (!!walletAddress && !!chainId) {
      var listToken = !!getListTokensFarmDefault(chainId) ? getListTokensFarmDefault(chainId) : [];
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
    const fetchListFarmDefault = async () => {
      if (!walletAddress) {
        await store.dispatch(setListTokensFarm(getListTokensFarmDefault(chainId)));
      } else {
        var listToken = !!getListTokensFarmDefault(chainId)
          ? getListTokensFarmDefault(chainId)
          : [];
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
      await store.dispatch(setContractAddress(getContractAddress(chainId)));
      setRootUrlsView(getRootUrlView(chainId));
    };

    if (!!chainId) {
      fetchListFarmDefault();
    }
  }, [chainId, walletAddress, listTokensFarm]);

  useEffect(() => {
    fetchAllFarm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTokensFarm]);

  useInterval(() => {
    fetchAllFarm();
  }, 5000);

  return (
    <div className='staking-view background-mode'>
      <div className='container'>
        <div className='list-staking'>
          <Row justify='center' gutter={[30, 30]}>
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
                    contractAddress={contractAddress}
                  />
                ))
              : null}
          </Row>
        </div>
      </div>
    </div>
  );
}
