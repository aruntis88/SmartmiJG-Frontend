import {
  CUSTOMER_LIST,
  COUNTRY_LIST,
  CUSTOMER_CREATE,
  CUSTOMER_DATA,
  CUSTOMER_UPDATE,
  CUSTOMER_HISTORY,
  CUSTOMER_MAINCONTRACTOR,
  CUSTOMER_MAINSUBCONTRACTOR,
  CUSTOMER_CLIENT,
  CUSTOMER_DESIGNCONSULTANT,
  CUSTOMER_SUPERVISIONCONSULTANT,
  CUSTOMER_TRADER,
  CUSTOMER_OTHERS,
  CUSTOMER_SUBCONTRACTOR,
} from "../../types/types";

const initialState = {
  customersList: [],
  customersMCList: [],
  customersMSCList: [],
  customersCList: [],
  customersDCList: [],
  customersSCList: [],
  customersTList: [],
  customersOList: [],
  customersSCOList: [],
};
export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case CUSTOMER_LIST:
      return {
        ...state,
        customersList: action.payload,
        createCustomer: false,
        updateCustomer: false,
      };
    case CUSTOMER_MAINCONTRACTOR:
      return {
        ...state,
        customersMCList: action.payload,
        createCustomer: false,
        updateCustomer: false,
      };
    case CUSTOMER_MAINSUBCONTRACTOR:
      return {
        ...state,
        customersMSCList: action.payload,
        createCustomer: false,
        updateCustomer: false,
      };
    case CUSTOMER_CLIENT:
      return {
        ...state,
        customersCList: action.payload,
        createCustomer: false,
        updateCustomer: false,
      };
    case CUSTOMER_DESIGNCONSULTANT:
      return {
        ...state,
        customersDCList: action.payload,
        createCustomer: false,
        updateCustomer: false,
      };
    case CUSTOMER_SUPERVISIONCONSULTANT:
      return {
        ...state,
        customersSCList: action.payload,
        createCustomer: false,
        updateCustomer: false,
      };
    case CUSTOMER_TRADER:
      return {
        ...state,
        customersTList: action.payload,
        createCustomer: false,
        updateCustomer: false,
      };
    case CUSTOMER_OTHERS:
      return {
        ...state,
        customersOList: action.payload,
        createCustomer: false,
        updateCustomer: false,
      };
    case CUSTOMER_SUBCONTRACTOR:
      return {
        ...state,
        customersSCOList: action.payload,
        createCustomer: false,
        updateCustomer: false,
      };

    case COUNTRY_LIST:
      return {
        ...state,
        countryList: action.payload,
      };
    case CUSTOMER_CREATE:
      return {
        ...state,
        createCustomer: action.payload,
      };
    case CUSTOMER_DATA:
      return {
        ...state,
        customerData: action.payload,
      };
    case CUSTOMER_UPDATE:
      return {
        ...state,
        updateCustomer: action.payload,
      };
    case CUSTOMER_HISTORY:
      return {
        ...state,
        customerHistory: action.payload,
      };
    default:
      return state;
  }
}
export const getCustomer = (state) => state.customersList;
export const getCustomerMC = (state) => state.customersMCList;
export const getCustomerMS = (state) => state.customersMSList;
export const getCustomerC = (state) => state.customersCList;
export const getCustomerDC = (state) => state.customersDCList;
export const getCustomerSC = (state) => state.customersSCList;
export const getCustomerT = (state) => state.customersTList;
export const getCustomerO = (state) => state.customersOList;
export const getCustomerSCO = (state) => state.customersSCOList;
export const getCountry = (state) => state.countryList;
export const getCustomerCreate = (state) => state.createCustomer;
export const getCustomerData = (state) => state.customerData;
export const getCustomerUpdate = (state) => state.updateCustomer;
export const getCustomerHistory = (state) => state.customerHistory;
