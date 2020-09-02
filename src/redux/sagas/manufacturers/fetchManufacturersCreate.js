import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createManufacturers } from "../../actions/manufacturers/action";
import {API_URL} from "../api"
export function manufacturersCreation(data) {

  var fd = new FormData();
  fd.append("name", data.name);
  fd.append("website", data.website);
  fd.append("logo", data.logo);
  fd.append("is_active", data.is_active);
  return dispatch => { 

    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/common/manufacturers/";
    API_URL+"/api/common/manufacturers/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"

    axios.post(url, fd).then(res => {
      if (res.status == 201) {
        toastr.success("Manufacturers", "Manufacturers created successfully", {
          position: "top-right"
        });
        dispatch(createManufacturers(true));
      } 
    });
  };
}