import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import CardFarm from './CardFarm';
import CardPool from './CardPool';
import {
  getListTokensFarmDefault,
  getListTokensPoolDefault,
  getRootUrlView,
  getContractAddress,
} from 'utils/getContractAddress';
import useInterval from 'utils/useInterval';
import {
  checkAllowanceFarm,
  setListTokensFarm,
  setListTokensPool,
  fetchPendingRewardFarm,
  fetchPendingRewardPool,
  fetchAmountStakeFarm,
  fetchAmountStakePool,
  fetchBalanceLP,
  fetchVestingTotalClaimableAmount,
  fetchTotalAmountLockedByUser,
  setContractAddress,
} from 'store/actions';
import store from 'store/index';
import './index.css';

export default function Farm() {
  const { walletAddress, chainId, listTokensFarm, listTokensPool, contractAddress } = useSelector(
    (state) => state
  );
  const [rootUrlsView, setRootUrlsView] = useState(getRootUrlView(chainId));
  const fetchAllFarm = useCallback(async () => {
    if (!!walletAddress && !!chainId) {
      var tokensFarm = !!getListTokensFarmDefault(chainId) ? getListTokensFarmDefault(chainId) : [];
      tokensFarm.forEach(async (pool, i) => {
        tokensFarm[i].pendingReward = await store.dispatch(
          fetchPendingRewardFarm(pool.contractFarm)
        );
        tokensFarm[i].allowanceFarm = await store.dispatch(
          checkAllowanceFarm(pool.addressLP, pool.contractFarm)
        );
        tokensFarm[i].amountStake = await store.dispatch(fetchAmountStakeFarm(pool.contractFarm));
        tokensFarm[i].balanceLP = await store.dispatch(fetchBalanceLP(pool.addressLP));
        tokensFarm[i].claimableAmount = await store.dispatch(
          fetchVestingTotalClaimableAmount(pool.contractVesting)
        );
        tokensFarm[i].amountLocking = await store.dispatch(
          fetchTotalAmountLockedByUser(pool.contractVesting)
        );
      });
      await store.dispatch(setListTokensFarm(tokensFarm));
    }
  }, [chainId, walletAddress]);

  const fetchAllPool = useCallback(async () => {
    if (!!walletAddress && !!chainId) {
      var tokensPool = !!getListTokensPoolDefault(chainId) ? getListTokensPoolDefault(chainId) : [];
      tokensPool.forEach(async (pool, i) => {
        tokensPool[i].pendingReward = await store.dispatch(
          fetchPendingRewardPool(pool.contractPool)
        );
        tokensPool[i].allowanceFarm = await store.dispatch(
          checkAllowanceFarm(pool.addressLP, pool.contractPool)
        );
        tokensPool[i].amountStake = await store.dispatch(fetchAmountStakePool(pool.contractPool));
        tokensPool[i].balanceLP = await store.dispatch(fetchBalanceLP(pool.addressLP));
      });
      await store.dispatch(setListTokensPool(tokensPool));
    }
  }, [chainId, walletAddress]);

  useEffect(() => {
    const fetchListDefault = async () => {
      if (!walletAddress) {
        await store.dispatch(setListTokensFarm(getListTokensFarmDefault(chainId)));
        await store.dispatch(setListTokensPool(getListTokensPoolDefault(chainId)));
      } else {
        fetchAllFarm();
        fetchAllPool();
      }
      await store.dispatch(setContractAddress(getContractAddress(chainId)));
      setRootUrlsView(getRootUrlView(chainId));
    };

    if (!!chainId) {
      fetchListDefault();
    }
  }, [chainId, walletAddress, listTokensFarm, fetchAllFarm, fetchAllPool]);

  useEffect(() => {
    fetchAllFarm();
    fetchAllPool();
  }, [listTokensFarm, listTokensPool, fetchAllFarm, fetchAllPool]);

  useInterval(() => {
    fetchAllFarm();
    fetchAllPool();
  }, 5000);

  return (
    <div className='staking-view background-mode'>
      <div className='container'>
        <div className='list-staking'>
          <Row justify='center' gutter={[30, 30]}>
            {!!listTokensPool
              ? listTokensPool.map((token, index) => (
                  <CardPool
                    token={token}
                    key={index}
                    index={index}
                    walletAddress={walletAddress}
                    fetchAllFarm={fetchAllFarm}
                    fetchAllPool={fetchAllPool}
                    rootUrlsView={rootUrlsView}
                    contractAddress={contractAddress}
                  />
                ))
              : null}
            {!!listTokensFarm
              ? listTokensFarm.map((token, index) => (
                  <CardFarm
                    token={token}
                    key={index}
                    index={index}
                    walletAddress={walletAddress}
                    fetchAllFarm={fetchAllFarm}
                    fetchAllPool={fetchAllPool}
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
