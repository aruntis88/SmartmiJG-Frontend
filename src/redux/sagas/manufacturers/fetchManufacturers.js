import axios from "axios";
import { manufacturersList } from "../../actions/manufacturers/action";
import {API_URL} from "../api"
export function fetchManufacturersList() {
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/common/manufacturers?no_page";
      API_URL+"/api/common/manufacturers?no_page";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(manufacturersList(res.data));
    });
  };
}
