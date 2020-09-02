import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createUnits } from "../../actions/units/action";
import {API_URL} from "../api"
export function unitsCreation(data) {
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/products/units/";
      API_URL+"/api/products/units/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, data).then(res => {
      if (res.status == 200) {
        toastr.success("Units", "Units created successfully", {
          position: "top-right"
        });
        dispatch(createUnits(true));
      } else dispatch(createUnits(false));
    });
  };
}
