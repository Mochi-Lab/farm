import './index.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='container'>
        <b>
          <p>Impermanent Loss (IL):</p>
        </b>{' '}
        <p className='text-blur'>
          - Risk: Risk of (impermanent) capital loss from asset can occur, to anyone participating
          in yield farming activities, such as staking MOMA/BNB LP token pair. Learn more about it{' '}
          <a
            href='https://academy.binance.com/en/articles/impermanent-loss-explained'
            target='_blank'
            rel='noreferrer'
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
}
