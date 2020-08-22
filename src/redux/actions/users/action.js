import { USER_LIST } from "../../types/types";
import {
  USER_SAILS_FILTER,
  USER_CREATE,
  USER_DATA,
  USER_UPDATE,
  USER_SAILS_FILTER_COMPANY
} from "../../types/types";
import { actions } from "react-redux-toastr";

export function userList(data) {
  return {
    type: USER_LIST,
    payload: data
  };
}

export function salesEnggUser(data) {
  return {
    type: USER_SAILS_FILTER,
    payload: data
  };
}
export function createUser(data) {
  return {
    type: USER_CREATE,
    payload: data
  };
}
export function userData(data) {
  return {
    type: USER_DATA,
    payload: data
  };
}
export function updateUser(data) {
  return {
    type: USER_UPDATE,
    payload: data
  };
}
export function salesEnggUserinCompany(data) {
  return {
    type: USER_SAILS_FILTER_COMPANY,
    payload: data
  };
}