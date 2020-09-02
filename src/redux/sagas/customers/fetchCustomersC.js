import axios from "axios";
import { customerCList } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerCList() {
  return (dispatch) => {
    const url =
      API_URL+"/api/customers/accounts?type=3";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerCList(res.data));
    });
  };
}
