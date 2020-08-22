import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createCustomer } from "../../actions/customers/action";
import {API_URL} from "../api"
export function customerCreation(data) {
  console.log(data)
  return dispatch => {
    const url =
      API_URL+"/api/customers/accounts/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, data).then(res => {
      if (res.status == 201) {
        toastr.success("Customer", "Customer created successfully", {
          position: "top-right"
        });
        dispatch(createCustomer(true));
      } else dispatch(createCustomer(false));
    });
  };
}
