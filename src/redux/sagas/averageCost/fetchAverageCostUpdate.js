import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateAvererageCost } from "../../actions/averageCost/action";
import {API_URL} from "../api.js";
export function averageCostUpdation(data, id) {
  return (dispatch) => {
    const url =
      API_URL+"/api/products/variants/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, data).then((res) => {
      toastr.success("Average Cost", "Average Cost updated successfully", {
        position: "top-right",
      });
      dispatch(updateAvererageCost(res.data.success));
    });
  };
}
