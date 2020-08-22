import {
  USER_LIST,
  USER_SAILS_FILTER,
  USER_CREATE,
  LOGIN_SUCCESS,
  USER_DATA,
  USER_UPDATE,
  USER_SAILS_FILTER_COMPANY
} from "../../types/types";

const initialState = {
  usersList: []
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    
    case USER_LIST:
      return {
        ...state,
        usersList: action.payload,
        createUser: false,
        loginSuccess: false
      };
    case USER_SAILS_FILTER:
      return {
        ...state,
        salesEnggUser: action.payload
      };
    case USER_CREATE:
      return {
        ...state,
        createUser: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: action.payload
      };
      case USER_DATA:
        return {
          ...state,
          userData: action.payload,
          updateUser:false
        };
      case USER_UPDATE:
        return {
          ...state,
          updateUser: action.payload
        };
        case USER_SAILS_FILTER_COMPANY:
          return {
            ...state,
            salesEnggUserinCompany: action.payload
          };
    default:
      return state;
  }
}
export const getUser = state => state.usersList;
export const getSalesEnggUser = state => state.salesEnggUser;
export const getUserCreate = state => state.createUser;
export const getLoginSuccess = state => state.loginSuccess;
export const getUserData = state => state.userData;
export const getUserUpdate = state => state.updateUser;
export const getSalesEnggUserinCompany = state => state.salesEnggUserinCompany;
