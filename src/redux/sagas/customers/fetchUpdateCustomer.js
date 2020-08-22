import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateCustomer } from "../../actions/customers/action";
import {API_URL} from "../api"
export function customerUpdation(data, id) {
  return dispatch => {
    const url =
      API_URL+"/api/customers/accounts/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, data).then(res => {
      toastr.success("Customer", "Customer updated successfully", {
        position: "top-right"
      });
      dispatch(updateCustomer(true));
    });
  };
}
