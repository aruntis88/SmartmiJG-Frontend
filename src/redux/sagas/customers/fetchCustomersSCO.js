import axios from "axios";
import { customerSCOList } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerSCOList() {
  return (dispatch) => {
    const url =
      API_URL+"/api/customers/accounts?type=8";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerSCOList(res.data));
    });
  };
}
