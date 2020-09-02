import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateUnit } from "../../actions/units/action";
import {API_URL} from "../api"
export function unitUpdation(data, id) {
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/products/units/" +
           API_URL+"/api/products/units/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, data).then(res => {
      toastr.success("Unit", "Unit updated successfully", {
        position: "top-right"
      });
      dispatch(updateUnit(res.data.success));
    });
  };
}
