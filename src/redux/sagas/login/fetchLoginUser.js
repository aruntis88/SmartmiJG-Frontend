import axios from "axios";
import { loginSuccess } from "../../actions/login/action";
import { toastr } from "react-redux-toastr";
import {API_URL} from "../api.js";
export function loginUser(data) {
  return (dispatch) => {
    
    const url =
      // "http://ec2-13-127-179-183.ap-south-1.compute.amazonaws.com:7004/api-token-auth/";
    API_URL+"/api-token-auth/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    console.log(url)
    axios.post(url, data).then((res) => {
      if (res.data.token) {
        toastr.success("Login", "User logged in successfully", {
          position: "top-right",
        });
        localStorage.setItem("user_name", res.data.user_name);
        localStorage.setItem("user_id", res.data.user_id);
        dispatch(loginSuccess(true));
      }
    });
  };
}
