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

export function customerMCList(data) {
  return {
    type: CUSTOMER_MAINCONTRACTOR,
    payload: data,
  };
}
export function customerMSCList(data) {
  return {
    type: CUSTOMER_MAINSUBCONTRACTOR,
    payload: data,
  };
}
export function customerCList(data) {
  return {
    type: CUSTOMER_CLIENT,
    payload: data,
  };
}
export function customerDCList(data) {
  return {
    type: CUSTOMER_DESIGNCONSULTANT,
    payload: data,
  };
}
export function customerSCList(data) {
  return {
    type: CUSTOMER_SUPERVISIONCONSULTANT,
    payload: data,
  };
}

export function customerTList(data) {
  return {
    type: CUSTOMER_TRADER,
    payload: data,
  };
}
export function customerOList(data) {
  return {
    type: CUSTOMER_OTHERS,
    payload: data,
  };
}
export function customerSCOList(data) {
  return {
    type: CUSTOMER_SUBCONTRACTOR,
    payload: data,
  };
}
export function customerList(data) {
  return {
    type: CUSTOMER_LIST,
    payload: data,
  };
}
export function countryListing(data) {
  return {
    type: COUNTRY_LIST,
    payload: data,
  };
}
export function createCustomer(data) {
  return {
    type: CUSTOMER_CREATE,
    payload: data,
  };
}
export function customerData(data) {
  return {
    type: CUSTOMER_DATA,
    payload: data,
  };
}
export function updateCustomer(data) {
  return {
    type: CUSTOMER_UPDATE,
    payload: data,
  };
}
export function customerHistory(data) {
  return {
    type: CUSTOMER_HISTORY,
    payload: data,
  };
}
