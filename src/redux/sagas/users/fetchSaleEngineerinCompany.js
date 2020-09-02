import axios from "axios";
import { salesEnggUserinCompany } from "../../actions/users/action";
import {API_URL} from "../api"
export function fetchSaleEngineerinCompany(id) {
  return dispatch => {
    const url =
      API_URL+"/api/users/accounts/?nopage&designation=SE&company="+id;
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(salesEnggUserinCompany(res.data.results));
    });
  };
}
