import axios from "axios";
import { customerDCList } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerDCList() {
  return (dispatch) => {
    const url =
      API_URL+"/api/customers/accounts?type=4";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerDCList(res.data));
    });
  };
}
