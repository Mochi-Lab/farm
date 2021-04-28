import './index.css';
import { useSelector } from 'react-redux';

export default function CountDownTime({ className }) {
  const blockStartStake = 7928683; // Block start farming

  const { web3 } = useSelector((state) => state);

  async function getBlockCurrent() {
    const currentBlockNumber = await web3.eth.getBlockNumber();
    return currentBlockNumber;
  }

  async function countDownFunc() {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
    var currentBlockNumber = await getBlockCurrent();
    let spaceBlockNumber = blockStartStake - currentBlockNumber;
    let block = await web3.eth.getBlock(currentBlockNumber);
    let timestampEnd = block.timestamp + spaceBlockNumber * 3;
    let countDown = new Date(timestampEnd * 1000).getTime();
    let x = setInterval(function () {
      let now = new Date().getTime();
      let distance = countDown - now;
      document.getElementById('days').innerText =
        Math.floor(distance / day) < 10
          ? '0' + Math.floor(distance / day)
          : Math.floor(distance / day);
      document.getElementById('hours').innerText =
        Math.floor((distance % day) / hour) < 10
          ? '0' + Math.floor((distance % day) / hour)
          : Math.floor((distance % day) / hour);
      document.getElementById('minutes').innerText =
        Math.floor((distance % hour) / minute) < 10
          ? '0' + Math.floor((distance % hour) / minute)
          : Math.floor((distance % hour) / minute);
      document.getElementById('seconds').innerText =
        Math.floor((distance % minute) / second) < 10
          ? '0' + Math.floor((distance % minute) / second)
          : Math.floor((distance % minute) / second);

      //do something later when date is reached
      if (distance < 0) {
        clearInterval(x);
      }
      //seconds
    }, 0);
  }

  countDownFunc();

  return (
    <div className={className}>
      <h1 id='headline' className='headline-countdown'>
        Countdown Time:
      </h1>
      <div id='countdown'>
        <ul>
          <li>
            <div className='number-time'>
              <span id='days'></span>
            </div>
            <div className='title'>days</div>
          </li>
          <li>
            <div className='number-time'>
              <span id='hours'></span>
            </div>
            <div className='title'>Hours</div>
          </li>
          <li>
            <div className='number-time'>
              <span id='minutes'></span>
            </div>
            <div className='title'>Minutes</div>
          </li>
          <li>
            <div className='number-time'>
              <span id='seconds'></span>
            </div>
            <div className='title'>Seconds</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
