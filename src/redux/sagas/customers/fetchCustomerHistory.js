import axios from "axios";
import { customerHistory } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerHistory(id) {
  return (dispatch) => {
    var url =
      API_URL+"/api/projects/history/?customer=" +
      id;

    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerHistory(res.data));
    });
  };
}
