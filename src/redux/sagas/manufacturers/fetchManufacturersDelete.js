import axios from "axios";
import { toastr } from "react-redux-toastr";
import { deleteManufacturers } from "../../actions/manufacturers/action";
import {API_URL} from "../api"
export function manufacturersDeletion(data) {
  console.log(data)
  
  return dispatch => {
    const url =
      API_URL+"/api/common/manufacturers/" +
      data +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.delete(url, data).then(res => {
        toastr.success("Manufacturers", "Manufacturers deleted successfully", {
          position: "top-right"
        });
        dispatch(deleteManufacturers(res.data.success));
    });
  };
}
