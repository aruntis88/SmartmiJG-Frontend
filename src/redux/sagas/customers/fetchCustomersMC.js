import axios from "axios";
import { customerMCList } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerMCList() {
  return (dispatch) => {
    const url =
      API_URL+"/api/customers/accounts?type=1";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerMCList(res.data));
    });
  };
}
