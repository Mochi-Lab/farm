import * as actions from 'store/actions';

const initialState = {
  // Common
  web3: null,
  chainId: null,
  walletAddress: null,
  shortAddress: null,
  adminAddress: null,
  balance: 0,
  listTokensFarm: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGOUT:
      return {
        ...state,
        walletAddress: null,
        shortAddress: null,
        adminAddress: null,
        balance: 0,
      };
    case actions.SET_WEB3:
      return {
        ...state,
        web3: action.web3,
      };
    case actions.SET_ADMIN_ADDRESS:
      return {
        ...state,
        adminAddress: action.adminAddress,
      };
    case actions.SET_CHAINID:
      return {
        ...state,
        chainId: action.chainId,
      };
    case actions.SET_ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
        shortAddress: action.shortAddress,
      };
    case actions.SET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case actions.SET_LIST_TOKENS_FARM:
      return {
        ...state,
        listTokensFarm: action.listTokensFarm,
      };
    default:
      return state;
  }
};

export default rootReducer;
