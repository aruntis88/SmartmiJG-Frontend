import axios from "axios";
import { customerSCList } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerSCList() {
  return (dispatch) => {
    const url =
      API_URL+"/api/customers/accounts?type=5";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerSCList(res.data));
    });
  };
}
