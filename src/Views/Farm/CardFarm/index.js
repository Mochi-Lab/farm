import { connectWeb3Modal } from 'Connections/web3Modal';
import { useEffect, useState } from 'react';
import { Col, Button, Tooltip } from 'antd';
import { /* SyncOutlined, ReloadOutlined */ QuestionCircleOutlined } from '@ant-design/icons';

import {
  approveAll,
  depositFarm,
  claimTotalVesting,
  fetchAprPool,
  fetchMultiplierFarm,
  fetchTotalTokenLP,
  fetchPriceTokenWithUSDT,
  fetchVestingDuration,
  calcPercentStakedFarm,
} from 'store/actions';

import { parseBalance } from 'utils/helper';
import ActionsFarm from 'Views/Farm/ActionsFarm';
import store from 'store/index';
import logoMochi from 'Assets/logo-mochi.png';
import './index.css';

export default function CardFarm({
  token,
  index,
  walletAddress,
  fetchAllFarm,
  fetchAllPool,
  rootUrlsView,
  contractAddress,
}) {
  const [loadingApprove, setloadingApprove] = useState(false);
  const [loadingHarvest, setLoadingHarvest] = useState(false);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDetailVesting, setShowDetailVesting] = useState(false);
  const [aprPool, setAprPool] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [vestingDuration, setVestingDuration] = useState(0);
  const [valueTotalLiquidity, setValueTotalLiquidity] = useState(0);
  const [percentInPool, setPercentInPool] = useState(0);

  useEffect(() => {
    const calculateTotalLock = async () => {
      let priceToken = await store.dispatch(
        fetchPriceTokenWithUSDT(contractAddress, token.addressLP, token.moma, token.decimalsMoma)
      );

      priceToken = !!priceToken && priceToken > 0 ? priceToken : 0;

      let totalToekLP =
        (await store.dispatch(
          fetchTotalTokenLP(token.addressLP, token.contractFarm, token.moma)
        )) >=
        10 ** 16
          ? (await store.dispatch(
              fetchTotalTokenLP(token.addressLP, token.contractFarm, token.moma)
            )) /
            10 ** 18
          : 0;
      let valueTotalLiquidity = parseInt(totalToekLP * priceToken);
      valueTotalLiquidity = valueTotalLiquidity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setValueTotalLiquidity(valueTotalLiquidity);
    };

    const fetchDataPool = async () => {
      setAprPool(
        await store.dispatch(
          fetchAprPool(token.addressLP, token.contractFarm, token.moma, token.yearlyMomaReward)
        )
      );
      setMultiplier(await store.dispatch(fetchMultiplierFarm(token.contractFarm)));
      setVestingDuration(
        await store.dispatch(
          fetchVestingDuration(token.contractVesting, rootUrlsView.blocksPerMonth)
        )
      );
      setPercentInPool(
        await store.dispatch(calcPercentStakedFarm(token.addressLP, token.contractFarm))
      );
    };
    fetchDataPool();
    calculateTotalLock();
  });

  async function approveTokenFarm(addressFarm, index) {
    if (!walletAddress) {
      await connectWeb3Modal();
    } else {
      setloadingApprove(true);
      await store.dispatch(approveAll(addressFarm, token.contractFarm));
      await fetchAllFarm();
      await fetchAllPool();
      setloadingApprove(false);
    }
  }

  async function harvestTokenFarm() {
    setLoadingHarvest(true);
    await store.dispatch(depositFarm(0, token.contractFarm));
    await fetchAllFarm();
    await fetchAllPool();
    setLoadingHarvest(false);
  }

  async function claimVesting() {
    setLoadingClaim(true);
    await store.dispatch(claimTotalVesting(token.contractVesting));
    await fetchAllFarm();
    await fetchAllPool();
    setLoadingClaim(false);
  }

  function isInt(n) {
    return Number(n) === n && n % 1 === 0;
  }

  return (
    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
      <div className='item-staking'>
        <div className='header-item'>
          <div className='logo-token'>
            <img src={!!token.icon ? token.icon : logoMochi} alt='logo-token' />
          </div>
          <div className='info-pool textmode'>
            <h2 className='textmode'>{token.namePair}</h2>(
            {vestingDuration > 0 ? `${vestingDuration} months vesting pool` : 'no vesting pool'})
            <div className='box-multi'>
              <div className='multier-pool'>
                <h3>
                  {isInt(parseBalance(multiplier, 12) * token.multiplier)
                    ? parseInt(parseBalance(multiplier, 12) * token.multiplier)
                    : parseFloat(parseBalance(multiplier, 12) * token.multiplier).toFixed(2)}{' '}
                  <span className='moma-per-block'>{token.symbolEarn}/Block</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className='content-item'>
          <div className='show-apr textmode'>
            <div className='title-apr'>APR</div>
            <div className='apr'>
              <svg
                viewBox='0 0 24 24'
                width='18px'
                color='text'
                xmlns='http://www.w3.org/2000/svg'
                className='sc-bdvvaa eomlrw textmode'
              >
                <path d='M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z'></path>
                <path d='M11.25 7.72H6.25V9.22H11.25V7.72Z'></path>
                <path d='M18 15.75H13V17.25H18V15.75Z'></path>
                <path d='M18 13.25H13V14.75H18V13.25Z'></path>
                <path d='M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18Z'></path>
                <path d='M14.09 10.95L15.5 9.54L16.91 10.95L17.97 9.89L16.56 8.47L17.97 7.06L16.91 6L15.5 7.41L14.09 6L13.03 7.06L14.44 8.47L13.03 9.89L14.09 10.95Z'></path>
              </svg>
              <span>{aprPool}%</span>
            </div>
          </div>
          <div className='show-earn textmode'>
            <div className='title-earn'>Earn: </div>
            <div className='token-earn'>
              <h3 className='textmode'>{token.symbolEarn}</h3>
            </div>
          </div>
          <div className='wrap-amount-stake wrap-earn textmode'>
            <div className='title-amount-stake textmode'>
              {token.symbolEarn} <span className='blur-text textmode'>EARNED</span>
            </div>
            <div className='token-earn'>
              <h3 className='textmode'>{parseBalance(token.pendingReward, 18)}</h3>
            </div>
          </div>

          <div className='wrap-detail-and-harvest textmode'>
            {vestingDuration > 0 || token.amountLocking > 0 ? (
              <div
                className='btn-show-detail'
                onClick={() => setShowDetailVesting(!showDetailVesting)}
              >
                {showDetailVesting ? (
                  <>
                    {' '}
                    Hide{''}
                    <svg
                      viewBox='0 0 24 24'
                      color='text'
                      width='20px'
                      xmlns='http://www.w3.org/2000/svg'
                      className='sc-bdvvaa eomlrw'
                    >
                      <path d='M8.11997 14.7101L12 10.8301L15.88 14.7101C16.27 15.1001 16.9 15.1001 17.29 14.7101C17.68 14.3201 17.68 13.6901 17.29 13.3001L12.7 8.7101C12.31 8.3201 11.68 8.3201 11.29 8.7101L6.69997 13.3001C6.30997 13.6901 6.30997 14.3201 6.69997 14.7101C7.08997 15.0901 7.72997 15.1001 8.11997 14.7101Z'></path>
                    </svg>
                  </>
                ) : (
                  <>
                    {' '}
                    Details Vesting{''}
                    <svg
                      viewBox='0 0 24 24'
                      color='text'
                      width='20px'
                      xmlns='http://www.w3.org/2000/svg'
                      className='sc-bdvvaa eomlrw'
                    >
                      <path d='M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z'></path>
                    </svg>
                  </>
                )}
              </div>
            ) : null}

            <div className='btn-harvet textmode'>
              <div className='harvest'>
                <Button
                  disabled={token.pendingReward <= 0}
                  loading={loadingHarvest}
                  onClick={() => harvestTokenFarm()}
                >
                  Harvest
                </Button>
              </div>
            </div>
          </div>
          {(vestingDuration > 0 || token.amountLocking > 0) && !!showDetailVesting ? (
            <div className='wrap-show-vesting'>
              <div className='show-vesting textmode'>
                <div className='title-vesting'>
                  Locked reward:{' '}
                  <Tooltip
                    title={`After harvesting your MOMA, it is locked for ${vestingDuration} months and appears here. Over the next ${vestingDuration} months, harvested MOMA will linearly become claimable in the "Claimable rewards" section below`}
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>{' '}
                </div>
                <div className='token-vesting'>
                  <h3 className='textmode'>{parseBalance(token.amountLocking, 18)}</h3>
                </div>
              </div>
              <div className='show-vesting textmode'>
                <div className='title-vesting'>Reward Vesting:</div>
                <div className='token-vesting'>
                  <h3 className='textmode'>{vestingDuration} months</h3>
                </div>
              </div>

              <div className='wrap-amount-stake textmode'>
                <div className='title-amount-claimable textmode'>
                  Claimable reward:{' '}
                  <Tooltip
                    title={`The rewards shown here are instantly claimable now. Because you decided for the ${vestingDuration} months pool, it will take ${vestingDuration} months until all of your locked rewards are claimable here`}
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>{' '}
                </div>
                <div className='token-earn'>
                  <h3 className='textmode text-pink'>{parseBalance(token.claimableAmount, 18)}</h3>
                </div>
              </div>
              <div className='harvest'>
                <Button
                  disabled={parseBalance(token.claimableAmount, 18) < 0.001}
                  onClick={() => claimVesting()}
                  loading={loadingClaim}
                >
                  Claim
                </Button>
              </div>
            </div>
          ) : null}

          <div className='symbol-staked textmode'>
            {token.namePair} LP <span className='blur-text textmode'>AVAILABLE - STAKED </span>
          </div>
          {!!walletAddress && token.allowanceFarm > 0 ? (
            <div className='wrap-amount-stake textmode'>
              <ActionsFarm
                token={token}
                fetchAllFarm={fetchAllFarm}
                percentInPool={percentInPool}
              />
            </div>
          ) : (
            <Button
              type='primary'
              className='btn-stake'
              size='large'
              onClick={() => approveTokenFarm(token.addressLP, index)}
              loading={loadingApprove}
            >
              Approve Contract
            </Button>
          )}
        </div>
        <div className='footer-item'>
          <div className='auto-restake-and-btn-detail'>
            {/* {!!token && !!token.autoRestake ? (
              <>
                <Tooltip title='Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.'>
                  <Button shape='round' className='btn-auto-restake'>
                    <SyncOutlined spin /> Auto
                  </Button>
                </Tooltip>
              </>
            ) : (
              <Tooltip title='You must harvest and compound your earnings from this pool manually.'>
                <Button shape='round' className='btn-manual-restake'>
                  <ReloadOutlined /> Manual
                </Button>
              </Tooltip>
            )} */}
            <div className='btn-show-detail' onClick={() => setShowDetail(!showDetail)}>
              {showDetail ? (
                <>
                  {' '}
                  Hide{''}
                  <svg
                    viewBox='0 0 24 24'
                    color='text'
                    width='20px'
                    xmlns='http://www.w3.org/2000/svg'
                    className='sc-bdvvaa eomlrw'
                  >
                    <path d='M8.11997 14.7101L12 10.8301L15.88 14.7101C16.27 15.1001 16.9 15.1001 17.29 14.7101C17.68 14.3201 17.68 13.6901 17.29 13.3001L12.7 8.7101C12.31 8.3201 11.68 8.3201 11.29 8.7101L6.69997 13.3001C6.30997 13.6901 6.30997 14.3201 6.69997 14.7101C7.08997 15.0901 7.72997 15.1001 8.11997 14.7101Z'></path>
                  </svg>
                </>
              ) : (
                <>
                  {' '}
                  Details{''}
                  <svg
                    viewBox='0 0 24 24'
                    color='text'
                    width='20px'
                    xmlns='http://www.w3.org/2000/svg'
                    className='sc-bdvvaa eomlrw'
                  >
                    <path d='M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z'></path>
                  </svg>
                </>
              )}
            </div>
          </div>

          {showDetail ? (
            <div className='detail-pool-stake'>
              <div className='total-liquidity textmode'>
                <div className='title-liquidity'>Total Liquidity: </div>
                <div className='amount-liquidity'>${valueTotalLiquidity} </div>
              </div>
              <div className='redirect-swap'>
                <a
                  href={`${rootUrlsView.addLP}${token.token0}/${token.moma}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Get {token.namePair} LP{' '}
                  <svg
                    viewBox='0 0 24 24'
                    color='primary'
                    width='15px'
                    xmlns='http://www.w3.org/2000/svg'
                    className='sc-bdvvaa ffCyIq'
                  >
                    <path d='M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z'></path>
                  </svg>
                </a>
              </div>
              <div className='view-contract-pool'>
                <a
                  href={`${rootUrlsView.viewContract}${token.addressLP}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  View Contract{' '}
                  <svg
                    viewBox='0 0 24 24'
                    color='primary'
                    width='15px'
                    xmlns='http://www.w3.org/2000/svg'
                    className='sc-bdvvaa ffCyIq'
                  >
                    <path d='M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z'></path>
                  </svg>
                </a>
              </div>
              <div className='see-pair-info'>
                <a
                  href={`${rootUrlsView.seePairInfo}${token.addressLP}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  See Pair Info{' '}
                  <svg
                    viewBox='0 0 24 24'
                    color='primary'
                    width='15px'
                    xmlns='http://www.w3.org/2000/svg'
                    className='sc-bdvvaa ffCyIq'
                  >
                    <path d='M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z'></path>
                  </svg>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Col>
  );
}
