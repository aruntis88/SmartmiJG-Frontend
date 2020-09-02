import { LOGIN_SUCCESS } from "../../types/types";

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
}
