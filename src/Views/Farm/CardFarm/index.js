import { connectWeb3Modal } from 'Connections/web3Modal';
import { useEffect, useState } from 'react';
import { Col, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { approveFarm, depositFarm, claimTotalVesting, setApr } from 'store/actions';
import { parseBalance } from 'utils/helper';
import ModalFarm from 'Views/Farm/ModalFarm';
import store from 'store/index';
import logoMochi from 'Assets/logo-mochi.png';
import './index.css';
import { useSelector } from 'react-redux';

export default function CardFarm({ token, index, walletAddress, fetchAllFarm, rootUrlsView }) {
  const [loadingApprove, setloadingApprove] = useState(false);
  const [loadingHarvest, setLoadingHarvest] = useState(false);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showModalFarm, setShowModalFarm] = useState({ status: false, type: '', symbol: '' });
  const { apr } = useSelector((state) => state);
  useEffect(() => {
    store.dispatch(setApr());
  });

  async function approveTokenFarm(addressFarm, index) {
    setloadingApprove(true);
    if (!walletAddress) {
      await connectWeb3Modal();
    } else {
      await store.dispatch(approveFarm(addressFarm, token.contractFarm));
      await fetchAllFarm();
    }
    setloadingApprove(false);
  }

  async function harvestTokenFarm() {
    setLoadingHarvest(true);
    await store.dispatch(depositFarm(0, token.contractFarm));
    fetchAllFarm();
    setLoadingHarvest(false);
  }

  async function claimVesting() {
    setLoadingClaim(true);
    await store.dispatch(claimTotalVesting(token.contractVesting));
    fetchAllFarm();
    setLoadingClaim(false);
  }

  return (
    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }}>
      <div className='item-staking'>
        <div className='header-item'>
          <div className='logo-token'>
            <img src={logoMochi} alt='logo-token' />
          </div>
          <div className='info-pool textmode'>
            <h2 className='textmode'>{token.namePair}</h2>
            <div className='box-multi'>
              <div className='text-core'>
                <svg
                  viewBox='0 0 24 24'
                  color='secondary'
                  width='20px'
                  xmlns='http://www.w3.org/2000/svg'
                  className='sc-bdvvaa jJFERw'
                >
                  <path d='M23 12L20.56 9.21L20.9 5.52L17.29 4.7L15.4 1.5L12 2.96L8.6 1.5L6.71 4.69L3.1 5.5L3.44 9.2L1 12L3.44 14.79L3.1 18.49L6.71 19.31L8.6 22.5L12 21.03L15.4 22.49L17.29 19.3L20.9 18.48L20.56 14.79L23 12ZM9.38 16.01L7 13.61C6.61 13.22 6.61 12.59 7 12.2L7.07 12.13C7.46 11.74 8.1 11.74 8.49 12.13L10.1 13.75L15.25 8.59C15.64 8.2 16.28 8.2 16.67 8.59L16.74 8.66C17.13 9.05 17.13 9.68 16.74 10.07L10.82 16.01C10.41 16.4 9.78 16.4 9.38 16.01Z'></path>
                </svg>
                <span>Core</span>
              </div>
              <div className='multier-pool'>
                <h3>40X</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='content-item'>
          <div className='show-apr textmode'>
            <div className='title-apr'>APR: </div>
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
              <span>{apr}%</span>
            </div>
          </div>
          <div className='show-earn textmode'>
            <div className='title-earn'>Earn: </div>
            <div className='token-earn'>
              <h3 className='textmode'>{token.symbolEarn}</h3>
            </div>
          </div>
          <div className='title-amount-stake textmode'>
            {token.symbolEarn} <span className='blur-text textmode'>EARNED</span>
          </div>
          <div className='wrap-amount-stake textmode'>
            <div className='token-earn'>
              <h3 className='textmode'>{parseBalance(token.pendingReward, 18)}</h3>
            </div>
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
          <div className='wrap-show-vesting'>
            <div className='show-vesting textmode'>
              <div className='title-vesting'>Vesting Duration: </div>
              <div className='token-vesting'>
                <h3 className='textmode'>6 month</h3>
              </div>
            </div>
            <div className='show-vesting textmode'>
              <div className='title-vesting'>{token.symbolEarn} locking: </div>
              <div className='token-vesting'>
                <h3 className='textmode'>{parseBalance(token.amountLocking, 18)}</h3>
              </div>
            </div>
            <div className='title-amount-claimable textmode'>Claimable Amount</div>
            <div className='wrap-amount-stake textmode'>
              <div className='token-earn'>
                <h3 className='textmode'>{parseBalance(token.claimableAmount, 18)}</h3>
              </div>
              <div className='harvest'>
                <Button
                  disabled={token.claimableAmount <= 0}
                  onClick={() => claimVesting()}
                  loading={loadingClaim}
                >
                  Claim
                </Button>
              </div>
            </div>
          </div>
          <div className='symbol-staked textmode'>
            {token.namePair} LP <span className='blur-text textmode'>STAKED</span>
          </div>
          {!!walletAddress && token.allowanceFarm > 0 ? (
            <div className='wrap-amount-stake textmode'>
              <div className='token-earn'>
                <h3 className='textmode'>{parseBalance(token.amountStake, 18)}</h3>
              </div>
              <div className='stake'>
                {token.amountStake > 0 ? (
                  <div className='stake-unstake'>
                    <Button
                      icon={<MinusOutlined />}
                      size='large'
                      onClick={() => {
                        setShowModalFarm({ status: true, type: 'unstake', symbol: token.namePair });
                      }}
                    />
                    <Button
                      icon={<PlusOutlined />}
                      size='large'
                      onClick={() => {
                        setShowModalFarm({ status: true, type: 'stake', symbol: token.namePair });
                      }}
                    />
                  </div>
                ) : (
                  <Button
                    type='primary'
                    className='btn-stake'
                    size='large'
                    onClick={() => {
                      setShowModalFarm({ status: true, type: 'stake', symbol: token.namePair });
                    }}
                  >
                    Stake LP
                  </Button>
                )}
              </div>
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
          {showDetail ? (
            <div className='detail-pool-stake'>
              <div className='total-liquidity textmode'>
                {/* <div className='title-liquidity'>Total Liquidity: </div>
                <div className='amount-liquidity'>$1,268,255,353 </div> */}
              </div>
              <div className='redirect-swap'>
                <a
                  href={`${rootUrlsView.addLP}${token.token0}/${token.addressAddLP}`}
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
                  href={`${rootUrlsView.viewContract}${token.viewContractPair}`}
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
                  href={`${rootUrlsView.seePairInfo}${token.viewContractPair}`}
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
      <ModalFarm
        showModalFarm={showModalFarm}
        setShowModalFarm={setShowModalFarm}
        token={token}
        fetchAllFarm={fetchAllFarm}
      />
    </Col>
  );
}
