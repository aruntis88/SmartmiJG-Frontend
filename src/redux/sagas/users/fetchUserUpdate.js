import axios from "axios";
import { toastr } from "react-redux-toastr";
import {updateUser} from "../../actions/users/action"
import {API_URL} from "../api"
export function userUpdation(data,id) {

  console.log(data)

  console.log(data, id)
  return dispatch => {
    const url =
      API_URL+"/api/users/accounts/"+id+"/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, data).then(res => {
      console.log("ssssssssssss",res)
      toastr.success("User", "User updated successfully", { position: "top-right" });
      dispatch(updateUser(true))
    });
  };
}
