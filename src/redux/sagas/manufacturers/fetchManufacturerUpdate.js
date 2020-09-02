import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateManufacturer } from "../../actions/manufacturers/action";
import {API_URL} from "../api"
export function manufacturerUpdation(data, id) {
  
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/common/manufacturers/" +
      API_URL+"/api/common/manufacturers/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, data).then(res => {
      console.log(res)
      toastr.success("Manufacturer", "Manufacturer updated successfully", {
        position: "top-right"
      });
      dispatch(updateManufacturer(res.data.success));
    });
  };
}
