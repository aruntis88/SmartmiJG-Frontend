import axios from "axios";
import { salesEnggUser } from "../../actions/users/action";
import {API_URL} from "../api"
export function salesEngineerFilter() {
  return dispatch => {
    const url =
      API_URL+"/api/users/accounts/?designation=SE&no_page";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(salesEnggUser(res.data));
    });
  };
}
