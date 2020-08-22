import axios from "axios";
import { customerOList } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerOList() {
  return (dispatch) => {
    const url =
      API_URL+"/api/customers/accounts?type=7";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerOList(res.data));
    });
  };
}
