import axios from "axios";
import { customerMSCList } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerMSCList() {
  return (dispatch) => {
    const url =
     API_URL+"/api/customers/accounts?type=2";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerMSCList(res.data));
    });
  };
}
