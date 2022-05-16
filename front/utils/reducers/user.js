import {
  NEW_ACCOUNT,
  NEW_ACCOUNT_SUCCESS,
  NEW_ACCOUNT_FAILURE,
  LOGIN_ACCOUNT,
  LOGIN_ACCOUNT_SUCCESS,
  LOGIN_ACCOUNT_FAILURE,
  CHECK_TOKEN,
  CHECK_TOKEN_FAILURE,
  CHECK_TOKEN_SUCCESS,
  LOG_OUT,
  CLEAN_ALERT
} from "../types/userTypes";

const initialState = {
  loading: false,
  alert: null,
  id: null,
  email: null,
  name: null,
  token: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_TOKEN:
    case LOGIN_ACCOUNT:
    case NEW_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: false,
        alert: null,
      }
    case NEW_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        alert: action.payload,
      }
    case CHECK_TOKEN_FAILURE:
    case LOGIN_ACCOUNT_FAILURE:
    case NEW_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        alert: action.payload.alert,
        id: null,
        email: null,
        name: null,
        token: null,
      }
    case LOGIN_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        alert: action.payload.alert,
        token: action.payload.accessToken,
      }
    case CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        alert: null,
        id: action.payload.user.id,
        email: action.payload.user.email,
        name: action.payload.user.nombre,
        token: action.payload.user.token,
      }
    case LOG_OUT:
      return {
        ...state,
        loading: false,
        alert: null,
        id: null,
        email: null,
        name: null,
        token: null,
      }
    case CLEAN_ALERT:
      return {
        ...state,
        alert: null,
        error: false,
      }
    default:
      return state;
  }
};

export default user;