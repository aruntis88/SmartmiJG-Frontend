import axios from "axios";
import { customerTList } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerTList() {
  return (dispatch) => {
    const url =
      API_URL+"/api/customers/accounts?type=6";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerTList(res.data));
    });
  };
}
