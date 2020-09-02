import axios from "axios";
import { toastr } from "react-redux-toastr";
import {createUser} from "../../actions/users/action"
import {API_URL} from "../api"
export function userCreation(data) {
  return dispatch => {
    const url =
      API_URL+"/api/users/accounts/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, data).then(res => {
      console.log("vvvvvvvv",res)
      if(res.data.success)
      toastr.success("User", "User created successfully", { position: "top-right" });
      else
      toastr.error("User", "User Not created successfully", {
        position: "top-right"
      });
      dispatch(createUser(res.data.success))
    });
  };
}
