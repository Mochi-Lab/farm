import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Grid, Col, Tag } from 'antd';
import { setWeb3, setChainId } from 'store/actions';
import { SearchOutlined } from '@ant-design/icons';
import { web3Default, networkDefault, getWeb3List } from 'utils/getWeb3List';
import { useLocation } from 'react-router-dom';
import './index.css';

const { useBreakpoint } = Grid;

export default function LeftNar() {
  const dispatch = useDispatch();
  const [network, setNetwork] = useState(networkDefault);
  const { chainId } = useSelector((state) => state);
  const location = useLocation();

  useEffect(() => {
    if (!!chainId) setNetwork(chainId);
  }, [chainId]);

  useEffect(() => {
    dispatch(setWeb3(getWeb3List(network).web3Default));
    dispatch(setChainId(network));
  }, [network, dispatch]);

  const { md } = useBreakpoint();
  const searchNFT = (text) => {};

  return (
    <Col
      span={md ? 40 : 25}
      className={location.pathname === '/browse' ? 'center' : 'alignItems'}
      style={{ height: '46px', paddingLeft: md ? '0px' : '10px' }}
    >
      <Tag color='success' className='radius-1rem'>
        <div className='box-live-time'>
          <div className='icon-live successDot'></div>
          <span className='time-counter--container'>
            <span>&nbsp;{web3Default[`${network}`].name}</span>
          </span>
        </div>
      </Tag>

      {location.pathname === '/browse' ? (
        <Input
          size='large'
          allowClear
          style={{ width: '100%' }}
          placeholder='Search by name, collection'
          onChange={(e) => searchNFT(e.target.value)}
          prefix={<SearchOutlined className='search-style' />}
          className='input-search-nft'
        />
      ) : (
        <></>
      )}
    </Col>
  );
}
