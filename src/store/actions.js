import { parseBalance } from 'utils/helper';
import ERC20 from 'Contracts/ERC20.json';
import Farm from 'Contracts/farm/Farm.json';
import MomaFarm from 'Contracts/farm/MomaFarm.json';
import Vesting from 'Contracts/farm/Vesting.json';
import Pair from 'Contracts/UniswapV2Pair.json';
import { message } from 'antd';

////////////////////
// Common
////////////////////
export const LOGOUT = 'LOGOUT';
export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT });
};

export const SET_WEB3 = 'SET_WEB3';
export const setWeb3 = (web3) => async (dispatch, getState) => {
  dispatch({ type: SET_WEB3, web3 });
};

export const SET_CHAINID = 'SET_CHAINID';
export const setChainId = (chainId) => (dispatch) => {
  localStorage.setItem('chainId', chainId);
  dispatch({ type: SET_CHAINID, chainId });
};

export const SET_LIST_TOKENS_FARM = 'SET_LIST_TOKENS_FARM';
export const setListTokensFarm = (listTokensFarm) => (dispatch) => {
  dispatch({ type: SET_LIST_TOKENS_FARM, listTokensFarm });
};
export const SET_LIST_TOKENS_POOL = 'SET_LIST_TOKENS_POOL';
export const setListTokensPool = (listTokensPool) => (dispatch) => {
  dispatch({ type: SET_LIST_TOKENS_POOL, listTokensPool });
};

export const SET_CONTRACT_ADDRESS = 'SET_CONTRACT_ADDRESS';
export const setContractAddress = (contractAddress) => (dispatch) => {
  dispatch({ type: SET_CONTRACT_ADDRESS, contractAddress });
};

export const SET_ADMIN_ADDRESS = 'SET_ADMIN_ADDRESS';
export const setAdminAddress = (addressesProvider) => async (dispatch) => {
  let adminAddress = await addressesProvider.methods.getAdmin().call();
  dispatch({
    type: SET_ADMIN_ADDRESS,
    adminAddress,
  });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = (walletAddress) => (dispatch) => {
  if (!!walletAddress) {
    var shortAddress = `${walletAddress.slice(0, 8)}...${walletAddress.slice(
      walletAddress.length - 6,
      walletAddress.length
    )}`;
    dispatch({
      type: SET_ADDRESS,
      walletAddress,
      shortAddress,
    });
    dispatch(setBalance());
  }
};

export const SET_BALANCE = 'SET_BALANCE';
export const setBalance = () => async (dispatch, getState) => {
  let { web3, walletAddress } = getState();
  let balance;
  if (walletAddress !== null)
    balance = parseBalance((await web3.eth.getBalance(walletAddress)).toString(), 18);
  else balance = 0;
  dispatch({
    type: SET_BALANCE,
    balance,
  });
};

export const approveAll = (addressToken, contractFarm) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();

  try {
    const instanceErc20 = new web3.eth.Contract(ERC20.abi, addressToken);
    await instanceErc20.methods
      .approve(contractFarm, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Approve Successfully !');
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        // message.error('Approve Error !');
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkAllowanceFarm = (addressToken, contractFarm) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const instanceErc20 = new web3.eth.Contract(ERC20.abi, addressToken);
    let allowance = await instanceErc20.methods.allowance(walletAddress, contractFarm).call();
    return allowance;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Allowance Error');
  }
};

export const fetchBalanceLP = (addressToken) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const instanceErc20 = new web3.eth.Contract(ERC20.abi, addressToken);
    let balanceLP = await instanceErc20.methods.balanceOf(walletAddress).call();
    return balanceLP;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Balance LP Error!');
  }
};

export const fetchVestingTotalClaimableAmount = (contractVesting) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  if (contractVesting !== '0x0000000000000000000000000000000000000000') {
    try {
      const vestingInstance = new web3.eth.Contract(Vesting.abi, contractVesting);
      let claimableAmount = await vestingInstance.methods
        .getVestingTotalClaimableAmount(walletAddress)
        .call();
      return claimableAmount;
    } catch (error) {
      console.log(error);
      // message.error('Fetch Vesting Claimable Error!');
    }
  }
};
export const fetchTotalAmountLockedByUser = (contractVesting) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  if (web3 && contractVesting !== '0x0000000000000000000000000000000000000000')
    try {
      const vestingInstance = new web3.eth.Contract(Vesting.abi, contractVesting);
      let amountLocking = await vestingInstance.methods
        .getTotalAmountLockedByUser(walletAddress)
        .call();
      return amountLocking;
    } catch (error) {
      console.log(error);
      // message.error('Fetch Amount Locked Error !');
    }
};

export const claimTotalVesting = (contractVesting) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const vestingInstance = new web3.eth.Contract(Vesting.abi, contractVesting);
    await vestingInstance.methods
      .claimTotalVesting()
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Claim Successfully !');
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        // message.error('Claim Error !');
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const roundToTwoDp = (number) => Math.round(number * 100) / 100;
export const fetchAprPool = (addressLP, contractFarm, moma, yearlyMomaReward) => async (
  dispatch,
  getState
) => {
  const { web3 } = getState();
  try {
    const pair = new web3.eth.Contract(Pair.abi, addressLP);
    const totalLpTokenInPool = await pair.methods.balanceOf(contractFarm).call();
    const reserves = await pair.methods.getReserves().call();
    let token0 = await pair.methods.token0().call();
    let amountMoma = 0;
    if (token0.toLowerCase() !== moma.toLowerCase()) {
      amountMoma = reserves[1];
    } else {
      amountMoma = reserves[0];
    }
    const totalSupply = await pair.methods.totalSupply().call();
    const LpTokenPriceMoma = (amountMoma * 2) / totalSupply;
    const poolLiquidityMoma = totalLpTokenInPool * LpTokenPriceMoma;
    const farm = new web3.eth.Contract(Farm.abi, contractFarm);
    const currentBlock = await web3.eth.getBlockNumber();
    const multiplier = await farm.methods.getMultiplier(currentBlock, currentBlock + 1).call();
    const reducingCycle = await farm.methods.reducingCycle().call();
    const rewardPerBlock = await farm.methods.rewardPerBlock().call();
    const yearlyMomaRewardAllocation = (multiplier * rewardPerBlock * reducingCycle * 12) / 1e12;

    // const yearlyMomaRewardAllocation = yearlyMomaReward * 10 ** 18;
    let apr = (yearlyMomaRewardAllocation / poolLiquidityMoma) * 100;
    apr = roundToTwoDp(apr);
    return apr;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Apr Error !');
    return false;
  }
  // const poolLiquidityMoma = totalLpTokenInPool * LpTokenPriceMoma;
  // const apr = yearlyMomaRewardAllocation.div(poolLiquidityMoma).times(100);
  // return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber();
};

export const fetchTotalTokenLP = (addressTokenLP, addressContractFarm, moma) => async (
  dispatch,
  getState
) => {
  const { web3 } = getState();
  try {
    const instanceLP = new web3.eth.Contract(ERC20.abi, addressTokenLP);
    const instanceMoma = new web3.eth.Contract(ERC20.abi, moma);
    let balanceMomaOfPair = await instanceMoma.methods.balanceOf(addressTokenLP).call();
    let balanceLPOfFarm = await instanceLP.methods.balanceOf(addressContractFarm).call();
    let totalSupplyLP = await instanceLP.methods.totalSupply().call();
    let totalTokenLP = (2 * balanceMomaOfPair * balanceLPOfFarm) / totalSupplyLP;
    return totalTokenLP;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Total Token LP Error !');
  }
};

export const fetchPriceTokenWithUSDT = (
  contractAddress,
  pairTokenAndNative,
  moma,
  decimalsMoma
) => async (dispatch, getState) => {
  const { web3 } = getState();
  try {
    if (!!contractAddress.PairUsdtNative) {
      // calculator price of native token ETH,BNB,...
      const instancePairUsdtNative = new web3.eth.Contract(
        Pair.abi,
        contractAddress.PairUsdtNative
      );
      let token0UsdtNative = await instancePairUsdtNative.methods.token0().call();
      let reservesUsdtNaive = await instancePairUsdtNative.methods.getReserves().call();
      let reserves0UsdtNative = reservesUsdtNaive[0],
        reserves1UsdtNative = reservesUsdtNaive[1];
      if (token0UsdtNative.toLowerCase() !== contractAddress.USDT.address.toLowerCase()) {
        [reserves0UsdtNative, reserves1UsdtNative] = [reserves1UsdtNative, reserves0UsdtNative];
      }
      let priceNative =
        reserves0UsdtNative /
        Math.pow(10, contractAddress.USDT.decimals) /
        (reserves1UsdtNative / Math.pow(10, contractAddress.NATIVE.decimals));

      // Calculator price of token need check by price native token
      const instancePairTokenNative = new web3.eth.Contract(Pair.abi, pairTokenAndNative);
      let token0TokenNative = await instancePairTokenNative.methods.token0().call();
      let reservesTokenNaive = await instancePairTokenNative.methods.getReserves().call();
      let reserves0TokenNative = reservesTokenNaive[0],
        reserves1TokenNative = reservesTokenNaive[1];
      if (token0TokenNative.toLowerCase() !== moma.toLowerCase()) {
        [reserves0TokenNative, reserves1TokenNative] = [reserves1TokenNative, reserves0TokenNative];
      }
      let priceMoma =
        (reserves1TokenNative /
          Math.pow(10, contractAddress.NATIVE.decimals) /
          (reserves0TokenNative / Math.pow(10, decimalsMoma))) *
        priceNative;

      return priceMoma;
    }
  } catch (error) {
    console.log(error);
    // message.error('Fetch Price Token Error !');
  }
};

export const fetchVestingDuration = (contractVesting, blocksPerMonth) => async (
  dispatch,
  getState
) => {
  const { web3 } = getState();
  if (contractVesting !== '0x0000000000000000000000000000000000000000') {
    try {
      const vestingInstance = new web3.eth.Contract(Vesting.abi, contractVesting);
      let vestingDuration = await vestingInstance.methods.vestingDuration().call();
      return vestingDuration / blocksPerMonth;
    } catch (error) {
      console.log(error);
      // message.error('Fetch Vesting Claimable Error!');
    }
  }
  return 0;
};

// Functions use contract Farm
export const depositFarm = (amountWei, contractFarm) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const farm = new web3.eth.Contract(Farm.abi, contractFarm);
    await farm.methods
      .deposit(amountWei)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        if (amountWei === 0) {
          message.success('Harvest Successfully !');
        } else {
          message.success('Deposit Successfully !');
        }
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        // message.error('Deposit Error !');
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const withdrawFarm = (amountWei, contractFarm) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const farm = new web3.eth.Contract(Farm.abi, contractFarm);
    await farm.methods
      .withdraw(amountWei)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Withdraw Successfully !');
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        // message.error('Withdraw Error !');
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchPendingRewardFarm = (contractFarm) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const farm = new web3.eth.Contract(Farm.abi, contractFarm);
    let pendingReward = await farm.methods.pendingReward(walletAddress).call();
    return pendingReward;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Pending Reward Error !');
  }
};
export const fetchAmountStakeFarm = (contractFarm) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const farm = new web3.eth.Contract(Farm.abi, contractFarm);
    let amountStake = await farm.methods.userInfo(walletAddress).call();
    return amountStake.amount;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Amount Stake Error!');
  }
};

export const fetchMultiplierFarm = (contractFarm) => async (dispatch, getState) => {
  const { web3 } = getState();
  try {
    const farm = new web3.eth.Contract(Farm.abi, contractFarm);
    const currentBlock = await web3.eth.getBlockNumber();
    const multiplier = await farm.methods.getMultiplier(currentBlock, currentBlock + 1).call();
    return multiplier;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Reward Per Block Error !');
    return false;
  }
};

// Functions use contract MomaFarm
export const depositPool = (amountWei, contractPool) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const instancePool = new web3.eth.Contract(MomaFarm.abi, contractPool);
    await instancePool.methods
      .deposit(amountWei)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        if (amountWei === 0) {
          message.success('Harvest Successfully !');
        } else {
          message.success('Deposit Successfully !');
        }
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        // message.error('Deposit Error !');
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const withdrawPool = (amountWei, contractPool) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const farm = new web3.eth.Contract(MomaFarm.abi, contractPool);
    await farm.methods
      .withdraw(amountWei)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Withdraw Successfully !');
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        // message.error('Withdraw Error !');
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchPendingRewardPool = (contractPool) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const farm = new web3.eth.Contract(MomaFarm.abi, contractPool);
    let pendingMoma = await farm.methods.pendingMoma(walletAddress).call();
    return pendingMoma;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Pending Reward Error !');
  }
};

export const fetchAmountStakePool = (contractPool) => async (dispatch, getState) => {
  const { web3, walletAddress } = getState();
  try {
    const farm = new web3.eth.Contract(MomaFarm.abi, contractPool);
    let amountStakedPool = await farm.methods.userInfo(walletAddress).call();
    return amountStakedPool.amount;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Amount Stake Error!');
  }
};

export const fetchMultiplierPool = (contractPool) => async (dispatch, getState) => {
  const { web3 } = getState();
  try {
    const farm = new web3.eth.Contract(MomaFarm.abi, contractPool);
    const currentBlock = await web3.eth.getBlockNumber();
    const multiplier = await farm.methods.getMultiplier(currentBlock, currentBlock + 1).call();
    return multiplier;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Reward Per Block Error !');
    return false;
  }
};

export const fetchTotalTokenPool = (addressTokenLP, contractPool) => async (dispatch, getState) => {
  const { web3 } = getState();
  try {
    const instanceLP = new web3.eth.Contract(ERC20.abi, addressTokenLP);
    let balanceLPOfPool = await instanceLP.methods.balanceOf(contractPool).call();
    return balanceLPOfPool;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Total Token LP Error !');
  }
};

export const fetchApyPool = (addressLP, contractPool, yearlyMomaReward) => async (
  dispatch,
  getState
) => {
  const { web3 } = getState();
  try {
    const tokenLP = new web3.eth.Contract(ERC20.abi, addressLP);
    const totalLpTokenInPool = await tokenLP.methods.balanceOf(contractPool).call();
    const farm = new web3.eth.Contract(MomaFarm.abi, contractPool);
    const currentBlock = await web3.eth.getBlockNumber();
    const multiplier = await farm.methods.getMultiplier(currentBlock, currentBlock + 1).call();
    const reducingCycle = await farm.methods.reducingCycle().call();
    const rewardPerBlock = await farm.methods.momaPerBlock().call();
    const yearlyMomaRewardAllocation = (multiplier * rewardPerBlock * reducingCycle * 12) / 1e12;
    // const yearlyMomaRewardAllocation = yearlyMomaReward * 10 ** 18;
    let apr = yearlyMomaRewardAllocation / totalLpTokenInPool;
    let dailyAPR = apr / 365;
    let apy = (1 + dailyAPR) ** 365 - 1;
    apy = roundToTwoDp(apy * 100);
    return apy;
  } catch (error) {
    console.log(error);
    // message.error('Fetch Apy Error !');
    return false;
  }
};

export const calcPercentStakedPool = (addressLP, contractPool) => async (dispatch, getState) => {
  const { walletAddress, web3 } = getState();
  if (!!walletAddress) {
    try {
      const tokenLP = new web3.eth.Contract(ERC20.abi, addressLP);
      const totalLpTokenInPool = await tokenLP.methods.balanceOf(contractPool).call();
      const farm = new web3.eth.Contract(MomaFarm.abi, contractPool);
      const amountStakedPool = await farm.methods.userInfo(walletAddress).call();
      const percentInPool = ((amountStakedPool.amount / totalLpTokenInPool) * 100).toFixed(2);
      return percentInPool;
    } catch (error) {
      console.log(error);
      // message.error('Fetch Apy Error !');
      return false;
    }
  }
};
export const calcPercentStakedFarm = (addressLP, contractFarm) => async (dispatch, getState) => {
  const { walletAddress, web3 } = getState();
  if (!!walletAddress) {
    try {
      const tokenLP = new web3.eth.Contract(ERC20.abi, addressLP);
      const totalLpTokenInPool = await tokenLP.methods.balanceOf(contractFarm).call();
      const farm = new web3.eth.Contract(Farm.abi, contractFarm);
      const amountStakedPool = await farm.methods.userInfo(walletAddress).call();
      const percentInFarm = ((amountStakedPool.amount / totalLpTokenInPool) * 100).toFixed(2);
      return percentInFarm;
    } catch (error) {
      console.log(error);
      // message.error('Fetch Apy Error !');
      return false;
    }
  }
};
